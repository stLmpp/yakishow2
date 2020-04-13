import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProdutoService } from '../../../produto/state/produto.service';
import { combineLatest, Subject } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Produto } from '../../../model/produto';
import { trackByFactory } from '../../../util/util';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-novo-pedido-form',
  templateUrl: './novo-pedido-form.component.html',
  styleUrls: ['./novo-pedido-form.component.scss'],
})
export class NovoPedidoFormComponent implements OnInit, OnDestroy {
  constructor(
    private produtoService: ProdutoService,
    private matExpansionPanel: MatExpansionPanel
  ) {}

  private _destroy$ = new Subject();

  @Input() form: FormGroup;

  @ViewChild('codigoRef')
  codigoRef: ElementRef<HTMLInputElement>;

  similarCodigos: Produto[] = [];
  trackByProduto = trackByFactory<Produto>('id');

  loadingCodigo = false;

  codigoFocused = false;

  selectCodigo(produto: Produto): void {
    this.codigoRef.nativeElement.blur();
    this.form.patchValue({
      descricao: produto.descricao,
      valorUnitario: produto.valor,
      produtoId: produto.id,
    });
  }

  startSub(): void {
    this.form
      .get('codigo')
      .valueChanges.pipe(
        takeUntil(this._destroy$),
        filter(() => this.codigoFocused),
        distinctUntilChanged(),
        filter(value => !!value),
        debounceTime(300),
        tap(() => {
          this.form.patchValue({
            descricao: null,
            valorUnitario: null,
            produtoId: null,
          });
        }),
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
    this.matExpansionPanel.afterExpand
      .pipe(
        takeUntil(this._destroy$),
        filter(() => !this.form.get('codigo').value),
        delay(0)
      )
      .subscribe(() => {
        this.codigoRef.nativeElement.focus();
      });
  }

  ngOnInit(): void {
    this.startSub();
    const withDistinct = (name: string) =>
      this.form
        .get(name)
        .valueChanges.pipe(takeUntil(this._destroy$), debounceTime(400));
    combineLatest([withDistinct('quantidade'), withDistinct('valorUnitario')])
      .pipe(takeUntil(this._destroy$))
      .subscribe(([quantidade, valor]) => {
        this.form
          .get('valorTotal')
          .setValue(+(quantidade ?? 0) * +(valor ?? 0), { emitEvent: false });
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
