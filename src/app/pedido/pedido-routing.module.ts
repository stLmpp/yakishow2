import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoComponent } from './pedido.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoComponent,
    data: { animation: 'Pedidos' },
  },
  {
    path: 'novo',
    component: NovoPedidoComponent,
    data: { animation: 'NovoPedido' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
