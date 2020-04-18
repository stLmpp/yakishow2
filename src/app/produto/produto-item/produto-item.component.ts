import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../state/produto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UpdateResult } from '../../model/update-result';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';
import { ValidatorsService } from '../../validators/validators.service';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoItemComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<ProdutoItemComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public produto: Produto,
    private produtoService: ProdutoService,
    private snackBarService: SnackBarService,
    private validatorsService: ValidatorsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.edit = !!produto;
    this.produto = new Produto(this.produto);
    if (!this.edit) {
      this.produto.ativo = true;
    }
  }

  loading = false;
  edit: boolean;

  form: FormGroup;

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
          this.snackBarService.success('Produto salvo com sucesso!', 'Fechar');
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
}
