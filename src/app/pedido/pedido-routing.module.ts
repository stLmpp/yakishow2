import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './pedido.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';
import { scrollToTopDisabled } from '../shared/scroll-to-top/scroll-to-top.component';
import { PedidosDiaResolver } from './pedidos-dia.resolver';
import { PedidosDiaComponent } from './pedidos-dia/pedidos-dia.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoComponent,
    data: { animation: 'Pedidos' },
  },
  {
    path: 'novo',
    component: NovoPedidoComponent,
    data: { animation: 'NovoPedido', [scrollToTopDisabled]: true },
  },
  {
    path: 'dia',
    component: PedidosDiaComponent,
    resolve: [PedidosDiaResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
