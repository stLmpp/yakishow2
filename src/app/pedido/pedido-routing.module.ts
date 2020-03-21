import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './pedido.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';
import { scrollToTopDisabled } from '../shared/scroll-to-top/scroll-to-top.component';
import { PedidosDiaResolver } from './pedidos-dia.resolver';
import { PedidosDiaComponent } from './pedidos-dia/pedidos-dia.component';
import { RouterParamsEnum } from '../model/router-params.enum';
import { PedidoItem } from '../model/pedido-item';
import { PedidoItemComponent } from './pedido-item/pedido-item.component';
import { PedidoItemResolver } from './pedido-item/pedido-item.resolver';

const routes: Routes = [
  {
    path: '',
    component: PedidoComponent,
    data: { animation: 'Pedidos' },
  },
  {
    path: 'novo',
    component: NovoPedidoComponent,
    data: {
      animation: 'NovoPedido',
      [scrollToTopDisabled]: true,
    },
  },
  {
    path: 'dia',
    component: PedidosDiaComponent,
    resolve: [PedidosDiaResolver],
    data: { animation: 'PedidosDia' },
  },
  {
    path: `:${RouterParamsEnum.idPedido}`,
    component: PedidoItemComponent,
    resolve: [PedidoItemResolver],
    data: { animation: 'PedidoItem' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
