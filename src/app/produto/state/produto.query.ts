import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProdutoState, ProdutoStore } from './produto.store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProdutoQuery extends QueryEntity<ProdutoState> {
  constructor(protected store: ProdutoStore) {
    super(store);
  }

  loading$ = this.selectLoading();
  all$ = this.selectAll();

  selectHasPedido(idProduto: number): Observable<boolean> {
    return this.selectEntity(idProduto).pipe(pluck('hasPedido'));
  }
}
