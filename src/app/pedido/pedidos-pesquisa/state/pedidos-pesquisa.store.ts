import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PedidosPesquisa } from './pedidos-pesquisa.model';

export type PedidosPesquisaState = PedidosPesquisa;

export function createInitialState(): PedidosPesquisaState {
  return {
    form: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pedidos-pesquisa' })
export class PedidosPesquisaStore extends Store<PedidosPesquisaState> {
  constructor() {
    super(createInitialState());
  }
}
