import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PedidoState, PedidoStore } from './pedido.store';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { Pedido } from '../../model/pedido';

const filterByDate = (date: Date) => (pedido: Pedido) =>
  format(pedido.creationDate, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy');

@Injectable({ providedIn: 'root' })
export class PedidoQuery extends QueryEntity<PedidoState> {
  constructor(protected store: PedidoStore) {
    super(store);
  }

  dayList$ = this.selectAll({
    filterBy: filterByDate(new Date()),
  });

  selectDayList(day: Date = new Date()): Observable<Pedido[]> {
    return this.selectAll({ filterBy: filterByDate(day) });
  }
}
