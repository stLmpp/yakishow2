import { Component, OnInit } from '@angular/core';
import { PedidoQuery } from './state/pedido.query';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  constructor(public pedidoQuery: PedidoQuery) {}

  ngOnInit(): void {}
}
