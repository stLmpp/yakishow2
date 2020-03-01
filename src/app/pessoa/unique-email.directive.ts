import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { PessoaService } from './state/pessoa.service';

@Directive({
  selector:
    '[uniqueEmail][formControl], [uniqueEmail][formControlName], [uniqueEmail][ngModel]',
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

  @Input() uniqueEmail: number;

  validate({
    value,
    valueChanges,
    pristine,
  }: AbstractControl): Observable<ValidationErrors | null> {
    if (!value || pristine) return of(null);
    return timer(400).pipe(
      distinctUntilChanged(),
      switchMap(() => {
        return this.pessoaService.existsByEmail(value, this.uniqueEmail).pipe(
          map(exists => {
            return exists ? { uniqueEmail: true } : null;
          })
        );
      })
    );
  }
}
