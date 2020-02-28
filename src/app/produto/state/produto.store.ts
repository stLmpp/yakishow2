import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Produto } from '../../model/produto';

export interface ProdutoState extends EntityState<Produto> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'produto', cache: { ttl: 600000 } })
export class ProdutoStore extends EntityStore<ProdutoState> {
  constructor() {
    super({ loading: false });
  }
}
