import { Pedido } from './pedido';
import { Produto } from './produto';
import { CommonHistory } from './common-history';

export class PedidoItem extends CommonHistory {
  id: number;
  produtoId: number;
  produto: Produto;
  pedidoId: number;
  pedido: Pedido;
  quantidade: number;
  observacao: string;
  total: number;
}
