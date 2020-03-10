import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProdutoService } from '../../../produto/state/produto.service';
import { combineLatest, Subject, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Produto } from '../../../model/produto';

@Component({
  selector: 'app-novo-pedido-form',
  templateUrl: './novo-pedido-form.component.html',
  styleUrls: ['./novo-pedido-form.component.scss'],
})
export class NovoPedidoFormComponent implements OnInit, OnDestroy {
  constructor(private produtoService: ProdutoService) {}

  private _destroy$ = new Subject();

  @Input() form: FormGroup;

  similarCodigos: Produto[] = [];

  loadingCodigo = false;

  blurCodigo(): void {
    const codigoControl = this.form.get('codigo');
    if (codigoControl.invalid) return;
    const codigo = codigoControl.value;
    const produto = this.similarCodigos.find(o => o.codigo === codigo);
    if (produto) {
      this.form.patchValue({
        descricao: produto.descricao,
        valorUnitario: produto.valor,
        produtoId: produto.id,
      });
    } else {
      this.loadingCodigo = true;
      this.produtoService
        .getByCodigo(codigo)
        .pipe(
          finalize(() => {
            this.loadingCodigo = false;
          }),
          catchError(err => {
            codigoControl.setErrors({ produtoNotFound: err.message });
            this.form.patchValue({
              descricao: null,
              valurUnitario: null,
              produtoId: null,
            });
            return throwError(err);
          })
        )
        .subscribe(({ descricao, valor, id }) => {
          codigoControl.setErrors(null);
          this.form.patchValue({
            descricao,
            valorUnitario: valor,
            produtoId: id,
          });
        });
    }
  }

  ngOnInit(): void {
    this.form
      .get('codigo')
      .valueChanges.pipe(
        takeUntil(this._destroy$),
        distinctUntilChanged(),
        filter(value => !!value),
        debounceTime(200),
        switchMap(value => {
          this.loadingCodigo = true;
          return this.produtoService.getBySimilarityCodigo(value).pipe(
            finalize(() => {
              this.loadingCodigo = false;
            })
          );
        })
      )
      .subscribe(produtos => {
        this.similarCodigos = produtos;
      });
    const withDistinct = (name: string) =>
      this.form
        .get(name)
        .valueChanges.pipe(takeUntil(this._destroy$), debounceTime(400));
    combineLatest([withDistinct('quantidade'), withDistinct('valorUnitario')])
      .pipe(takeUntil(this._destroy$))
      .subscribe(([quantidade, valor]) => {
        this.form
          .get('valorTotal')
          .setValue(+(quantidade ?? 0) * +(valor ?? 0));
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
