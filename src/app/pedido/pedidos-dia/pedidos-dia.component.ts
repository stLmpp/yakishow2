import { Component, OnInit } from '@angular/core';
import { PedidoQuery } from '../state/pedido.query';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Observable } from 'rxjs';
import { Pedido } from '../../model/pedido';
import { parse } from 'date-fns';

@Component({
  selector: 'app-pedidos-dia',
  templateUrl: './pedidos-dia.component.html',
  styleUrls: ['./pedidos-dia.component.scss'],
})
export class PedidosDiaComponent implements OnInit {
  constructor(
    public pedidoQuery: PedidoQuery,
    private routerQuery: RouterQuery
  ) {}

  list$: Observable<Pedido[]>;

  ngOnInit(): void {
    const dia = this.routerQuery.getQueryParams<string>('dia');
    this.list$ = this.pedidoQuery.selectDayList(
      dia ? parse(dia, 'dd-MM-yyyy', new Date()) : new Date()
    );
  }
}
