import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { ProdutoService } from '../../produto/state/produto.service';
import { Observable, of, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Directive({
  selector:
    '[ykUniqueCodigo][formControl], [ykUniqueCodigo][formControlName], [ykUniqueCodigo][ngModel]',
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

  @Input() ykUniqueCodigo: number;

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    return uniqueCodigoValidator(
      this.produtoService,
      this.ykUniqueCodigo
    )(control);
  }
}

export const uniqueCodigoValidator = (
  produtoService: ProdutoService,
  idProduto?: number
): AsyncValidatorFn => ({ value, pristine }) => {
  if (!value || pristine) return of(null);
  return timer(400).pipe(
    distinctUntilChanged(),
    switchMap(() => {
      return produtoService.existsByCodigo(value, idProduto).pipe(
        map(exists => {
          return exists ? { uniqueCodigo: true } : null;
        })
      );
    })
  );
};
