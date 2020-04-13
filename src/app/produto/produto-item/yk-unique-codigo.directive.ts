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
    '[ykUniqueCodigo][formControl], [ykUniqueCodigo][formControlName], [ykUniqueCodigo][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => YkUniqueCodigoDirective),
      multi: true,
    },
  ],
})
export class YkUniqueCodigoDirective implements AsyncValidator {
  constructor(private produtoService: ProdutoService) {}

  @Input() ykUniqueCodigo: number;

  validate({
    value,
    pristine,
  }: AbstractControl): Observable<ValidationErrors | null> {
    if (!value || pristine) return of(null);
    return timer(400).pipe(
      distinctUntilChanged(),
      switchMap(() => {
        return this.produtoService
          .existsByCodigo(value, this.ykUniqueCodigo)
          .pipe(
            map(exists => {
              return exists ? { uniqueCodigo: true } : null;
            })
          );
      })
    );
  }
}
