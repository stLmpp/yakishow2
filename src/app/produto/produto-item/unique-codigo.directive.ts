import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { ProdutoService } from '../state/produto.service';
import { Observable, of, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Directive({
  selector:
    '[uniqueCodigo][formControl], [uniqueCodigo][formControlName], [uniqueCodigo][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueCodigoDirective),
      multi: true,
    },
  ],
})
export class UniqueCodigoDirective implements AsyncValidator {
  constructor(private produtoService: ProdutoService) {}

  @Input() uniqueCodigo: number;

  validate({
    value,
    valueChanges,
    pristine,
  }: AbstractControl): Observable<ValidationErrors | null> {
    if (!value || pristine) return of(null);
    return timer(400).pipe(
      distinctUntilChanged(),
      switchMap(() => {
        return this.produtoService
          .existsByCodigo(value, this.uniqueCodigo)
          .pipe(
            map(exists => {
              return exists ? { uniqueCodigo: true } : null;
            })
          );
      })
    );
  }
}
