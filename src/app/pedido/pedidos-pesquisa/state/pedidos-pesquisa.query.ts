import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  PedidosPesquisaStore,
  PedidosPesquisaState,
} from './pedidos-pesquisa.store';
import { PedidosPesquisaForm } from './pedidos-pesquisa.model';
import { removeNullObject } from '../../../util/util';

@Injectable({ providedIn: 'root' })
export class PedidosPesquisaQuery extends Query<PedidosPesquisaState> {
  constructor(protected store: PedidosPesquisaStore) {
    super(store);
  }

  getForm(): PedidosPesquisaForm {
    return removeNullObject(this.getValue().form);
  }
}
