import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
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
import { removeNilObject, trackByFactory } from '../../util/util';
import { MaskEnum } from '../../model/mask.enum';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../produto/state/produto.service';
import { Pedido } from '../../model/pedido';
import { PedidoService } from '../state/pedido.service';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-pedidos-pesquisar',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.scss'],
})
export class PedidosPesquisaComponent implements OnInit, OnDestroy {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private pessoaService: PessoaService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService
  ) {}

  private _destroy$ = new Subject();

  @ViewChild('searchPanel') searchPanelRef: MatExpansionPanel;

  form = new FormGroup({
    dataCriacao: new FormControl({ value: null, disabled: true }),
    dataFinalizado: new FormControl({ value: null, disabled: true }),
    cliente: new FormControl(),
    clienteId: new FormControl(),
    produtoId: new FormControl(),
    produto: new FormControl(),
    status: new FormControl(),
  });

  touchUi$: Observable<boolean>;

  clientes$: Observable<Pessoa[]>;
  clientesLoading = false;

  produtos$: Observable<Produto[]>;
  produtosLoading = false;

  pedidos$: Observable<Pedido[]>;

  maskEnum = MaskEnum;

  trackByCliente = trackByFactory<Pessoa>('id');
  trackByProduto = trackByFactory<Produto>('id');

  selectCliente(cliente: Pessoa): void {
    const clienteControl = this.form.get('cliente');
    this.form.get('clienteId').setValue(cliente?.id);
    if (cliente?.id) {
      clienteControl.disable();
    } else {
      clienteControl.enable();
      clienteControl.setValue(null);
    }
  }

  selectProduto(produto: Produto): void {
    const produtoControl = this.form.get('produto');
    this.form.get('produtoId').setValue(produto?.id);
    if (produto?.id) {
      produtoControl.disable();
    } else {
      produtoControl.enable();
      produtoControl.setValue(null);
    }
  }

  pesquisar(): void {
    const payload = removeNilObject({
      ...this.form.value,
      dataCriacao: this.form.get('dataCriacao').value,
    });
    if (payload.dataFinalizado) {
      const [hour, minute] = payload.dataFinalizado.split(':').map(Number);
      payload.dataFinalizado = new Date(
        payload.dataCriacao.setHours(hour, minute)
      );
    }
    this.pedidos$ = this.pedidoService.getByParams(payload).pipe(
      finalize(() => {
        this.searchPanelRef.close();
      })
    );
  }

  ngOnInit(): void {
    this.clientes$ = this.form.get('cliente').valueChanges.pipe(
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
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
