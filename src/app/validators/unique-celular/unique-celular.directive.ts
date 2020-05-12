import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { PessoaService } from '../../pessoa/state/pessoa.service';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Directive({
  selector:
    '[ykUniqueCelular][formControl],[ykUniqueCelular][formControlName],[ykUniqueCelular][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueCelularDirective),
      multi: true,
    },
  ],
})
export class UniqueCelularDirective implements AsyncValidator {
  constructor(private pessoaService: PessoaService) {}

  @Input() ykUniqueCelular: number;

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueCelularValidator(
      this.pessoaService,
      this.ykUniqueCelular
    )(control);
  }
}

export const uniqueCelularValidator = (
  pessoaService: PessoaService,
  idPessoa?: number
): AsyncValidatorFn => ({ value, pristine }: AbstractControl) => {
  if (!value || pristine) return of(null);
  return timer(400).pipe(
    distinctUntilChanged(),
    switchMap(() => {
      return pessoaService.existsByCelular(value, idPessoa).pipe(
        map(exists => {
          return exists ? { uniqueCelular: true } : null;
        })
      );
    })
  );
};
