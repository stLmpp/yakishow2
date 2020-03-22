import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { PessoaQuery } from '../state/pessoa.query';
import { Observable, Subject, throwError } from 'rxjs';
import { Pessoa } from '../../model/pessoa';
import { RouterParamsEnum } from '../../model/router-params.enum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MasksEnum } from '../../model/masks.enum';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ViaCepService } from '../../shared/via-cep/via-cep.service';
import { PessoaService } from '../state/pessoa.service';
import { isArray } from 'is-what';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';

@Component({
  selector: 'app-pessoa-item',
  templateUrl: './pessoa-item.component.html',
  styleUrls: ['./pessoa-item.component.scss'],
})
export class PessoaItemComponent implements OnInit, OnDestroy {
  constructor(
    private pessoaQuery: PessoaQuery,
    private routerQuery: RouterQuery,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private viaCepService: ViaCepService,
    private pessoaService: PessoaService,
    private snackBarService: SnackBarService
  ) {}

  private _destroy$ = new Subject();

  form: FormGroup;
  idPessoa: number;
  masksEnum = MasksEnum;
  loadingCep = false;

  loadingPessoa = false;

  save(): void {
    if (this.form.invalid) return;
    this.loadingPessoa = true;
    let http: Observable<Pessoa>;
    if (this.idPessoa) {
      http = this.pessoaService.patchPessoa(this.idPessoa, this.form.value);
    } else {
      http = this.pessoaService.postPessoa(new Pessoa({ ...this.form.value }));
    }
    http
      .pipe(
        tap(() => {
          this.navigateBack();
          this.snackBarService.open('Pessoa salva com sucesso!', 'Fechar');
        }),
        finalize(() => {
          this.loadingPessoa = false;
        }),
        catchError(err => {
          if (
            isArray(err.message) &&
            err.message.some(o => o.property === 'email')
          ) {
            this.snackBarService.open('E-mail inválido!');
          } else {
            this.snackBarService.open(err.message);
          }

          return throwError(err);
        })
      )
      .subscribe();
  }

  navigateBack(): void {
    let commands = '../';
    const queryParams: Params = {};
    if (this.idPessoa) {
      commands = '/pessoas';
      queryParams[RouterParamsEnum.idPessoa] = this.idPessoa;
    }
    this.router.navigate([commands], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }

  initSub(): void {
    const cepControl = this.form.get('cep');
    cepControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        distinctUntilChanged(),
        filter(cep => cepControl.valid && cep),
        debounceTime(400),
        switchMap(cep => {
          this.loadingCep = true;
          return this.viaCepService.getEndereco(cep).pipe(
            finalize(() => {
              this.loadingCep = false;
            })
          );
        })
      )
      .subscribe(({ complemento, bairro, logradouro, localidade }) => {
        const newFormPatch: Partial<Pessoa> = {};
        if (!this.form.get('complemento').value) {
          newFormPatch.complemento = complemento;
        }
        if (!this.form.get('endereco').value) {
          newFormPatch.endereco =
            !bairro && !logradouro ? localidade : bairro + ', ' + logradouro;
        }
        this.form.patchValue(newFormPatch);
      });
  }

  ngOnInit(): void {
    this.idPessoa = this.routerQuery.getParams(RouterParamsEnum.idPessoa);
    const pessoa = this.pessoaQuery.getEntity(this.idPessoa) ?? new Pessoa();
    const { celular, tipos, complemento, cep, nome, email, endereco } = pessoa;
    this.form = new FormGroup({
      nome: new FormControl(nome),
      celular: new FormControl(celular),
      complemento: new FormControl(complemento),
      tipos: new FormControl(tipos),
      cep: new FormControl(cep),
      email: new FormControl(email),
      endereco: new FormControl(endereco),
    });
    // TODO fazer tipos de pessoas
    if (!this.idPessoa) {
      this.form.get('tipos').setValue([{ tipoPessoaId: 1 }]);
    }
    this.initSub();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
