import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Pedido } from '../../model/pedido';
import { interval, Observable, Subject } from 'rxjs';
import { PedidoQuery } from '../state/pedido.query';
import { RouteParamsEnum } from '../../model/route-params.enum';
import { MaskEnum } from '../../model/mask.enum';
import { PedidoItem } from '../../model/pedido-item';
import { Sort } from '@angular/material/sort';
import { trackByFactory } from '../../util/util';
import {
  debounceTime,
  finalize,
  map,
  startWith,
  take,
  takeUntil,
} from 'rxjs/operators';
import {
  pedidoStatusArray,
  PedidoStatusEnum,
} from '../../model/pedido-status.enum';
import { PedidoService } from '../state/pedido.service';
import { MatDialog } from '@angular/material/dialog';
import { transformPedidoStatus } from '../pedido-status.pipe';
import { addDays } from 'date-fns';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosPesquisaService } from '../pedidos-pesquisa/state/pedidos-pesquisa.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { DialogData } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidoItemComponent implements OnInit, OnDestroy {
  constructor(
    private routerQuery: RouterQuery,
    private pedidoQuery: PedidoQuery,
    private pedidoService: PedidoService,
    private matDialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pedidosPesquisaService: PedidosPesquisaService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: DialogService
  ) {}

  private _destroy$ = new Subject();

  nowDate$ = interval(30000).pipe(
    takeUntil(this._destroy$),
    startWith(addDays(new Date(), -5)),
    map(() => addDays(new Date(), -5))
  );

  @Input('pedido')
  set _pedido(pedido: Pedido) {
    this.pedido = pedido;
    this.idPedido = pedido.id;
    this.inputPedido = true;
  }
  pedido: Pedido;

  idPedido: number;

  @Input() backUrl: string;
  @Input() editPedido: boolean;

  inputPedido: boolean;

  pedido$: Observable<Pedido>;
  pedidoStatusList = pedidoStatusArray();
  columns: Array<keyof PedidoItem | string> = [
    'produto.codigo',
    'produto.valor',
    'quantidade',
    'total',
  ];
  columns1: string[] = ['label1', 'dummy1', 'dummy11', 'total1'];
  columns2: string[] = ['label2', 'dummy2', 'dummy21', 'total2'];
  maskEnum = MaskEnum;
  sort: Sort;

  private _changingStatus$ = new Subject<boolean>();
  changingStatus$ = this._changingStatus$
    .asObservable()
    .pipe(debounceTime(200));

  trackByPedidoItem = trackByFactory<PedidoItem>('id');

  confirmEditStatus = false;

  clickOverlayChangeStatus(status: PedidoStatusEnum, isBlocked: boolean): void {
    const data: DialogData = {
      content: isBlocked
        ? `Não é possível alterar o status do pedido, pois já se passaram 5 dias (${formatDate(
            this.pedido.dataFinalizado,
            'dd/MM/yyyy HH:mm',
            this.locale
          )}) desde a finalização/cancelamento`
        : `Tem certeza que deseja mudar o status desse pedido?<br> Ele já está com o status de "${transformPedidoStatus(
            status
          )}".`,
      buttonConfirmar: isBlocked ? null : 'Sim',
      buttonCancelar: isBlocked ? 'Ok' : 'Não',
    };
    this.dialogService
      .confirm(data)
      .afterClosed()
      .pipe(take(1))
      .subscribe(confirmed => {
        this.confirmEditStatus = confirmed;
        this.changeDetectorRef.markForCheck();
      });
  }

  changeStatusPedido(status: PedidoStatusEnum): void {
    this._changingStatus$.next(true);
    this.changeDetectorRef.markForCheck();
    this.pedidoService
      .updateStatus(this.idPedido, status)
      .pipe(
        finalize(() => {
          this._changingStatus$.next(false);
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe(pedido => {
        if (pedido.dataFinalizado) {
          this.confirmEditStatus = false;
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  @HostListener('swiperight')
  navigateBack(): void {
    const backUrl = this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.backUrl
    );
    if (backUrl) {
      this.router.navigateByUrl(backUrl);
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  ngOnInit(): void {
    this.pedidosPesquisaService.stopTimeoutResetForm();
    if (!this.pedido) {
      this.idPedido = +this.routerQuery.getParams<string>(
        RouteParamsEnum.idPedido
      );
      this.pedido = this.pedidoQuery.getEntity(this.idPedido);
      this.pedido$ = this.pedidoQuery.selectEntity(this.idPedido);
    }
    this.backUrl = this.backUrl ?? '/pedidos/' + this.idPedido;
  }

  ngOnDestroy(): void {
    this.pedidosPesquisaService.resetFormInTimeout();
    this._destroy$.next();
    this._destroy$.complete();
  }
}
