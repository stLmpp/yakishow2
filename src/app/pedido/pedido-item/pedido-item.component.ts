import {
  Component,
  DoCheck,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Pedido } from '../../model/pedido';
import { Observable, Subject } from 'rxjs';
import { PedidoQuery } from '../state/pedido.query';
import { RouteParamsEnum } from '../../model/route-params.enum';
import { MaskEnum } from '../../model/mask.enum';
import { PedidoItem } from '../../model/pedido-item';
import { Sort } from '@angular/material/sort';
import { trackByFactory } from '../../util/util';
import { debounceTime, finalize, take } from 'rxjs/operators';
import {
  pedidoStatusArray,
  PedidoStatusEnum,
} from '../../model/pedido-status.enum';
import { PedidoService } from '../state/pedido.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogOptions,
} from '../../shared/confirm-dialog/confirm-dialog.component';
import { transformPedidoStatus } from '../pedido-status.pipe';
import { addDays } from 'date-fns';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosPesquisaService } from '../pedidos-pesquisa/state/pedidos-pesquisa.service';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.scss'],
})
export class PedidoItemComponent implements OnInit, DoCheck, OnDestroy {
  constructor(
    private routerQuery: RouterQuery,
    private pedidoQuery: PedidoQuery,
    private pedidoService: PedidoService,
    private matDialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pedidosPesquisaService: PedidosPesquisaService
  ) {}

  nowDate = addDays(new Date(), -5);

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
  maskEnum = MaskEnum;
  sort: Sort;

  private _changingStatus$ = new Subject<boolean>();
  changingStatus$ = this._changingStatus$
    .asObservable()
    .pipe(debounceTime(200));

  trackByPedidoItem = trackByFactory<PedidoItem>('id');

  confirmEditStatus = false;

  clickOverlayChangeStatus(status: PedidoStatusEnum, isBlocked: boolean): void {
    const data: ConfirmDialogOptions = {
      content: isBlocked
        ? `Não é possível mais alterar o status do pedido, pois já se passaram 5 dias (${formatDate(
            this.pedido.dataFinalizado,
            'dd/MM/yyyy HH:mm',
            this.locale
          )}) desde a finalização/cancelamento`
        : `Tem certeza que deseja mudar o status desse pedido?<br> Ele já está com o status de "${transformPedidoStatus(
            status
          )}".`,
      yesBtn: isBlocked ? null : 'Sim',
      noBtn: isBlocked ? 'Ok' : 'Não',
    };
    this.matDialog
      .open(ConfirmDialogComponent, {
        data,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe(confirmed => {
        this.confirmEditStatus = confirmed;
      });
  }

  changeStatusPedido(status: PedidoStatusEnum): void {
    this._changingStatus$.next(true);
    this.pedidoService
      .updateStatus(this.idPedido, status)
      .pipe(finalize(() => this._changingStatus$.next(false)))
      .subscribe(pedido => {
        if (pedido.dataFinalizado) {
          this.confirmEditStatus = false;
        }
      });
  }

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

  ngDoCheck(): void {
    this.nowDate = addDays(new Date(), -5);
  }

  ngOnDestroy(): void {
    this.pedidosPesquisaService.resetFormInTimeout();
  }
}
