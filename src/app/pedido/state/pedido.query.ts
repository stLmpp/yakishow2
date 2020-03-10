import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PedidoState, PedidoStore } from './pedido.store';
import { format } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class PedidoQuery extends QueryEntity<PedidoState> {
  constructor(protected store: PedidoStore) {
    super(store);
  }

  dayList$ = this.selectAll({
    filterBy: pedido =>
      format(pedido.creationDate, 'dd/MM/yyyy') ===
      format(new Date(), 'dd/MM/yyyy'),
  });
}
