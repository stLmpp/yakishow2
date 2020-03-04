import { Pedido } from './pedido';
import { Produto } from './produto';
import { CommonHistory } from './common-history';
import { CreateInstance } from '../core/create-instance/create-instance.interceptor';

@CreateInstance()
export class PedidoItem extends CommonHistory {
  id: number;
  produtoId: number;
  produto: Produto;
  pedidoId: number;
  pedido: Pedido;
  quantidade: number;
}
