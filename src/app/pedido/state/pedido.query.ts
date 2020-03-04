import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PedidoStore, PedidoState } from './pedido.store';

@Injectable({ providedIn: 'root' })
export class PedidoQuery extends QueryEntity<PedidoState> {
  constructor(protected store: PedidoStore) {
    super(store);
  }
}
