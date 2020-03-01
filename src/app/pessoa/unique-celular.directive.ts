import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { PessoaService } from './state/pessoa.service';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Directive({
  selector:
    '[uniqueCelular][formControl], [uniqueCelular][formControlName], [uniqueCelular][ngModel]',
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

  @Input() uniqueCelular: number;

  validate({
    value,
    valueChanges,
    pristine,
  }: AbstractControl): Observable<ValidationErrors | null> {
    if (!value || pristine) return of(null);
    return timer(400).pipe(
      distinctUntilChanged(),
      switchMap(() => {
        return this.pessoaService
          .existsByCelular(value, this.uniqueCelular)
          .pipe(
            map(exists => {
              return exists ? { uniqueCelular: true } : null;
            })
          );
      })
    );
  }
}
