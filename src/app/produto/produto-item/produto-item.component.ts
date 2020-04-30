import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../state/produto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { UpdateResult } from '../../model/update-result';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';
import { ValidatorsService } from '../../validators/validators.service';
import { ProdutoQuery } from '../state/produto.query';
import { isUndefined } from 'is-what';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoItemComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    public matDialogRef: MatDialogRef<ProdutoItemComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public produto: Produto,
    private produtoService: ProdutoService,
    private snackBarService: SnackBarService,
    private validatorsService: ValidatorsService,
    private changeDetectorRef: ChangeDetectorRef,
    private produtoQuery: ProdutoQuery
  ) {
    this.edit = !!produto;
    this.produto = new Produto(this.produto);
    if (!this.edit) {
      this.produto.ativo = true;
    }
  }

  private _destroy$ = new Subject();

  loading = false;
  loadingExistsPedido = false;
  edit: boolean;

  form: FormGroup;

  hasPedido$: Observable<boolean>;

  onSubmit(): void {
    this.loading = true;
    this.matDialogRef.disableClose = true;
    let http: Observable<Produto | UpdateResult>;
    const produto = this.form.getRawValue();
    if (this.edit) {
      http = this.produtoService.updateProduto(this.produto.id, produto);
    } else {
      http = this.produtoService.addProduto(new Produto(produto));
    }
    http
      .pipe(
        tap(() => {
          this.matDialogRef.close();
          this.snackBarService.success('Produto salvo com sucesso!');
        }),
        finalize(() => {
          this.loading = false;
          this.matDialogRef.disableClose = false;
          this.changeDetectorRef.markForCheck();
        }),
        catchError(err => {
          this.snackBarService.error(
            err?.message ?? 'Erro ao tentar salvar o produto!'
          );
          return throwError(err);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.hasPedido$ = this.produtoQuery.selectHasPedido(this.produto?.id);
    this.form = new FormGroup({
      codigo: new FormControl(this.produto.codigo, {
        validators: [Validators.required],
        asyncValidators: [this.validatorsService.uniqueCodigo(this.produto.id)],
      }),
      descricao: new FormControl(this.produto.descricao, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      valor: new FormControl(this.produto.valor, [Validators.required]),
      ativo: new FormControl(this.produto.ativo),
    });
  }

  ngAfterViewInit(): void {
    if (this.produto?.id && isUndefined(this.produto?.hasPedido)) {
      this.loadingExistsPedido = true;
      this.produtoService
        .getExistsPedido(this.produto?.id)
        .pipe(
          delay(0),
          finalize(() => {
            this.loadingExistsPedido = false;
            this.changeDetectorRef.markForCheck();
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
