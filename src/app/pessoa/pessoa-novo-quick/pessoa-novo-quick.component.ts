import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MaskEnum } from '../../model/mask.enum';
import { PessoaService } from '../state/pessoa.service';
import { Pessoa } from '../../model/pessoa';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';

@Component({
  selector: 'app-pessoa-novo-quick',
  templateUrl: './pessoa-novo-quick.component.html',
  styleUrls: ['./pessoa-novo-quick.component.scss'],
})
export class PessoaNovoQuickComponent implements OnInit {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public celular: string,
    private pessoaService: PessoaService,
    private matDialogRef: MatDialogRef<PessoaNovoQuickComponent>,
    private snackBarService: SnackBarService
  ) {}

  form: FormGroup;

  masksEnum = MaskEnum;

  loading = false;

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.pessoaService
      .postPessoa(new Pessoa(this.form.value))
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        tap(pessoa => {
          this.matDialogRef.close(pessoa);
          this.snackBarService.open('Pessoa criada com sucesso!', 'Fechar');
        }),
        catchError(error => {
          this.snackBarService.open(error.message);
          return throwError(error);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(),
      celular: new FormControl(this.celular),
      endereco: new FormControl(),
      // TODO add tipos
      tipos: new FormControl([{ tipoPessoaId: 1 }]),
    });
  }
}
