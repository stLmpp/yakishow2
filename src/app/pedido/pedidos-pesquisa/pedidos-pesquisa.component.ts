import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  pluck,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { PessoaService } from '../../pessoa/state/pessoa.service';
import { Pessoa } from '../../model/pessoa';
import {
  isAllNull,
  isEmpty,
  removeNullObject,
  trackByFactory,
} from '../../util/util';
import { MaskEnum } from '../../model/mask.enum';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../produto/state/produto.service';
import { Pedido } from '../../model/pedido';
import { PedidoService } from '../state/pedido.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { RouteParamsEnum } from '../../model/route-params.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosPesquisaService } from './state/pedidos-pesquisa.service';
import { PedidosPesquisaQuery } from './state/pedidos-pesquisa.query';
import { PedidoQuery } from '../state/pedido.query';
import { ScrollService } from '../../shared/scroll/scroll.service';

@Component({
  selector: 'app-pedidos-pesquisar',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidosPesquisaComponent implements OnInit, OnDestroy {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private pessoaService: PessoaService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private pedidoQuery: PedidoQuery,
    private snackBarService: SnackBarService,
    private routerQuery: RouterQuery,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pedidosPesquisaService: PedidosPesquisaService,
    private pedidosPesquisaQuery: PedidosPesquisaQuery,
    private changeDetectorRef: ChangeDetectorRef,
    private scrollService: ScrollService
  ) {}

  private _destroy$ = new Subject();

  @ViewChild('searchPanel') searchPanelRef: MatExpansionPanel;

  form = new FormGroup({
    dataCriacao: new FormControl({ value: null, disabled: true }),
    dataFinalizado: new FormControl({ value: null, disabled: true }),
    cliente: new FormControl(),
    idCliente: new FormControl(),
    idProduto: new FormControl(),
    produto: new FormControl(),
    status: new FormControl(),
  });

  @ViewChildren('pedidos', { read: ElementRef }) pedidosRef: QueryList<
    ElementRef
  >;

  touchUi$: Observable<boolean>;

  clientes$: Observable<Pessoa[]>;
  clientesLoading = false;

  produtos$: Observable<Produto[]>;
  produtosLoading = false;

  private _pedidos$ = new BehaviorSubject<Pedido[]>([]);
  pedidos$ = this._pedidos$.asObservable();
  pedidosLoading = false;

  maskEnum = MaskEnum;

  activeId: number;

  trackByCliente = trackByFactory<Pessoa>('id');
  trackByProduto = trackByFactory<Produto>('id');
  trackByPedido = trackByFactory<Pedido>('id');

  selectCliente(idCliente: number): void {
    this.form.get('idCliente').setValue(idCliente);
  }

  selectProduto(idProduto: number): void {
    this.form.get('idProduto').setValue(idProduto);
  }

  pesquisar(doScroll?: boolean): void {
    const payload = removeNullObject(
      {
        ...this.form.getRawValue(),
      },
      'loose'
    );
    if (payload.dataFinalizado) {
      const [hour, minute] = payload.dataFinalizado.split(':').map(Number);
      payload.dataFinalizado = new Date(
        payload.dataCriacao.setHours(hour, minute)
      );
    }
    if (isEmpty(payload)) {
      this.snackBarService.warning(
        'Precisa de pelo menos um parâmetro de pesquisa'
      );
      return;
    }
    this.pedidosLoading = true;
    this.pedidoService
      .getByParams(payload)
      .pipe(
        finalize(() => {
          this.searchPanelRef.close();
          this.pedidosLoading = false;
          if (doScroll) {
            this.doScrollAndMarkPedido();
          }
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe(pedidos => {
        this._pedidos$.next(pedidos);
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

  initSub(): void {
    this.clientes$ = this.form.get('cliente').valueChanges.pipe(
      takeUntil(this._destroy$),
      distinctUntilChanged(),
      filter(o => !!o),
      debounceTime(200),
      switchMap(cliente => {
        this.clientesLoading = true;
        return this.pessoaService.getByTermAutocomplete(cliente, true).pipe(
          finalize(() => {
            this.clientesLoading = false;
          })
        );
      })
    );
    this.produtos$ = this.form.get('produto').valueChanges.pipe(
      takeUntil(this._destroy$),
      distinctUntilChanged(),
      filter(o => !!o),
      debounceTime(200),
      switchMap(term => {
        this.produtosLoading = true;
        return this.produtoService.getBySearchAutocomplete(term, true).pipe(
          finalize(() => {
            this.produtosLoading = false;
          })
        );
      })
    );
    const clienteControl = this.form.get('cliente');
    this.form
      .get('idCliente')
      .valueChanges.pipe(takeUntil(this._destroy$), distinctUntilChanged())
      .subscribe(id => {
        if (id) {
          clienteControl.disable();
        } else {
          clienteControl.enable();
          clienteControl.setValue(null);
        }
      });
    const produtoControl = this.form.get('produto');
    this.form
      .get('idProduto')
      .valueChanges.pipe(takeUntil(this._destroy$), distinctUntilChanged())
      .subscribe(id => {
        if (id) {
          produtoControl.disable();
        } else {
          produtoControl.enable();
          produtoControl.setValue(null);
        }
      });
    this.touchUi$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(pluck('matches'));
    this.form
      .get('dataCriacao')
      .valueChanges.pipe(takeUntil(this._destroy$), distinctUntilChanged())
      .subscribe(value => {
        if (value) {
          this.form.get('dataFinalizado').enable();
        } else {
          this.form.get('dataFinalizado').disable();
        }
      });
    this.form.valueChanges
      .pipe(takeUntil(this._destroy$), debounceTime(500))
      .subscribe(() => {
        this.pedidosPesquisaService.updateForm(this.form.getRawValue());
      });
  }

  doScrollAndMarkPedido(): void {
    const idPedido = +this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.idPedido
    );
    if (idPedido) {
      this.activeId = idPedido;
      setTimeout(() => {
        this.scrollService.scrollIntoViewOffset(
          this.pedidosRef.find(o => +o.nativeElement.id === idPedido),
          -100
        );
        setTimeout(() => {
          this.activeId = null;
          this.changeDetectorRef.markForCheck();
        }, 1500);
      }, 250);
    }
  }

  ngOnInit(): void {
    this.pedidosPesquisaService.stopTimeoutResetForm();
    this.initSub();
    this.form.patchValue(this.pedidosPesquisaQuery.getForm() ?? {});
    const idPessoa = +this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.idPessoa
    );
    if (idPessoa) {
      this.form.get('idCliente').setValue(idPessoa);
      this.pessoaService.getById(idPessoa).subscribe(({ nome }) => {
        this.form.get('cliente').setValue(nome);
        this.form.get('cliente').disable();
      });
    }
    const idProduto = +this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.idProduto
    );
    if (idProduto) {
      this.form.get('produtoId').setValue(idProduto);
      this.produtoService.getById(idProduto).subscribe(({ descricao }) => {
        this.form.get('produto').setValue(descricao);
        this.form.get('produto').disable();
      });
    }
    if (!isAllNull(this.form.getRawValue())) {
      this.pesquisar(true);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.pedidosPesquisaService.resetFormInTimeout();
  }
}
