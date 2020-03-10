import { Component, OnInit } from '@angular/core';
import { PedidoQuery } from '../state/pedido.query';

@Component({
  selector: 'app-pedidos-dia',
  templateUrl: './pedidos-dia.component.html',
  styleUrls: ['./pedidos-dia.component.scss'],
})
export class PedidosDiaComponent implements OnInit {
  constructor(public pedidoQuery: PedidoQuery) {}

  ngOnInit(): void {}
}
