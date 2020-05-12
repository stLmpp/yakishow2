import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { PessoaService } from '../../pessoa/state/pessoa.service';

@Directive({
  selector:
    '[ykUniqueEmail][formControl], [ykUniqueEmail][formControlName], [ykUniqueEmail][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailDirective),
      multi: true,
    },
  ],
})
export class UniqueEmailDirective implements AsyncValidator {
  constructor(private pessoaService: PessoaService) {}

  @Input() ykUniqueEmail: number;

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    return uniqueEmailValidator(
      this.pessoaService,
      this.ykUniqueEmail
    )(control);
  }
}

export const uniqueEmailValidator = (
  pessoaService: PessoaService,
  idPessoa?: number
): AsyncValidatorFn => ({ value, pristine }) => {
  if (!value || pristine) return of(null);
  return timer(400).pipe(
    distinctUntilChanged(),
    switchMap(() => {
      return pessoaService.existsByEmail(value, idPessoa).pipe(
        map(exists => {
          return exists ? { uniqueEmail: true } : null;
        })
      );
    })
  );
};
