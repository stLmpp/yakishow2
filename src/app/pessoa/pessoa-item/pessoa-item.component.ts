import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { PessoaQuery } from '../state/pessoa.query';
import { Observable, Subject, throwError } from 'rxjs';
import { Pessoa } from '../../model/pessoa';
import { RouteParamsEnum } from '../../model/route-params.enum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaskEnum } from '../../model/mask.enum';
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
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';
import { ValidatorsService } from '../../validators/validators.service';

@Component({
  selector: 'app-pessoa-item',
  templateUrl: './pessoa-item.component.html',
  styleUrls: ['./pessoa-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PessoaItemComponent implements OnInit, OnDestroy {
  constructor(
    private pessoaQuery: PessoaQuery,
    private routerQuery: RouterQuery,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private viaCepService: ViaCepService,
    private pessoaService: PessoaService,
    private snackBarService: SnackBarService,
    private changeDetectorRef: ChangeDetectorRef,
    private validatorsService: ValidatorsService
  ) {}

  private _destroy$ = new Subject();

  form: FormGroup;
  idPessoa: number;
  masksEnum = MaskEnum;
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
          this.snackBarService.success('Pessoa salva com sucesso!');
        }),
        finalize(() => {
          this.loadingPessoa = false;
          this.changeDetectorRef.markForCheck();
        }),
        catchError(err => {
          this.snackBarService.error(
            err?.message ?? 'Erro ao tentar salvar a pessoa!'
          );
          return throwError(err);
        })
      )
      .subscribe();
  }

  @HostListener('swiperight')
  navigateBack(): void {
    let commands = '../';
    const queryParams: Params = {};
    if (this.idPessoa) {
      commands = '/pessoas';
      queryParams[RouteParamsEnum.idPessoa] = this.idPessoa;
    }
    const backUrl = this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.backUrl
    );
    if (backUrl) {
      this.router.navigateByUrl(backUrl);
      return;
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
    this.idPessoa = this.routerQuery.getParams(RouteParamsEnum.idPessoa);
    const pessoa = this.pessoaQuery.getEntity(this.idPessoa) ?? new Pessoa();
    const { celular, tipos, complemento, cep, nome, email, endereco } = pessoa;
    this.form = new FormGroup({
      nome: new FormControl(nome, [Validators.required]),
      celular: new FormControl(celular, {
        validators: [Validators.required],
        asyncValidators: [this.validatorsService.uniqueCelular(this.idPessoa)],
      }),
      complemento: new FormControl(complemento),
      tipos: new FormControl(tipos),
      cep: new FormControl(cep),
      email: new FormControl(email, {
        validators: [Validators.email],
        asyncValidators: [this.validatorsService.uniqueEmail(this.idPessoa)],
      }),
      endereco: new FormControl(endereco, [Validators.required]),
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
