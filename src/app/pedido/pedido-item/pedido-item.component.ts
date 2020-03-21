import { Component, OnInit } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Pedido } from '../../model/pedido';
import { Observable } from 'rxjs';
import { PedidoQuery } from '../state/pedido.query';
import { RouterParamsEnum } from '../../model/router-params.enum';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.scss'],
})
export class PedidoItemComponent implements OnInit {
  constructor(
    private routerQuery: RouterQuery,
    private pedidoQuery: PedidoQuery
  ) {}

  idPedido: number;
  pedido: Pedido;
  pedido$: Observable<Pedido>;

  ngOnInit(): void {
    this.idPedido = +this.routerQuery.getParams<string>(
      RouterParamsEnum.idPedido
    );
    this.pedido = this.pedidoQuery.getEntity(this.idPedido);
    this.pedido$ = this.pedidoQuery.selectEntity(this.idPedido);
  }
}
