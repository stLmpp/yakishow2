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
    '[ykUniqueCelular][formControl],[ykUniqueCelular][formControlName],[ykUniqueCelular][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => YkUniqueCelularDirective),
      multi: true,
    },
  ],
})
export class YkUniqueCelularDirective implements AsyncValidator {
  constructor(private pessoaService: PessoaService) {}

  @Input() ykUniqueCelular: number;

  validate({
    value,
    pristine,
  }: AbstractControl): Observable<ValidationErrors | null> {
    if (!value || pristine) return of(null);
    return timer(400).pipe(
      distinctUntilChanged(),
      switchMap(() => {
        return this.pessoaService
          .existsByCelular(value, this.ykUniqueCelular)
          .pipe(
            map(exists => {
              return exists ? { uniqueCelular: true } : null;
            })
          );
      })
    );
  }
}
