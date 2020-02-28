import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProdutoState, ProdutoStore } from './produto.store';

@Injectable({ providedIn: 'root' })
export class ProdutoQuery extends QueryEntity<ProdutoState> {
  constructor(protected store: ProdutoStore) {
    super(store);
  }

  loading$ = this.selectLoading();
  all$ = this.selectAll();
}
