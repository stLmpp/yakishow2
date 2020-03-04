import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Pedido } from '../../model/pedido';

export interface PedidoState extends EntityState<Pedido> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pedido' })
export class PedidoStore extends EntityStore<PedidoState> {
  constructor() {
    super();
  }
}
