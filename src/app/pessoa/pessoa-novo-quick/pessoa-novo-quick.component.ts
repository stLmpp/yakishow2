import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaskEnum } from '../../model/mask.enum';
import { PessoaService } from '../state/pessoa.service';
import { Pessoa } from '../../model/pessoa';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';
import { ValidatorsService } from '../../validators/validators.service';

@Component({
  selector: 'app-pessoa-novo-quick',
  templateUrl: './pessoa-novo-quick.component.html',
  styleUrls: ['./pessoa-novo-quick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PessoaNovoQuickComponent implements OnInit {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) data: string,
    private pessoaService: PessoaService,
    private matDialogRef: MatDialogRef<PessoaNovoQuickComponent>,
    private snackBarService: SnackBarService,
    private changeDetectorRef: ChangeDetectorRef,
    private validatorsService: ValidatorsService
  ) {
    this.data = data.substring(0, 11);
  }

  data: string;

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
          this.changeDetectorRef.markForCheck();
        }),
        tap(pessoa => {
          this.matDialogRef.close(pessoa);
          this.snackBarService.success('Pessoa criada com sucesso!', 'Fechar');
        }),
        catchError(error => {
          this.snackBarService.error(
            error?.message ?? 'Erro ao tentar salvar a pessoa!'
          );
          return throwError(error);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    const isNumber = /^\d+$/.test(this.data);
    this.form = new FormGroup({
      nome: new FormControl(isNumber ? null : this.data, [Validators.required]),
      celular: new FormControl(isNumber ? this.data : null, {
        asyncValidators: [this.validatorsService.uniqueCelular()],
        validators: [Validators.required],
      }),
      endereco: new FormControl(null, [Validators.required]),
      // TODO add tipos
      tipos: new FormControl([{ tipoPessoaId: 1 }]),
    });
  }
}
