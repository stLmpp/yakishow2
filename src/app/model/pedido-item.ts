import { Pedido } from './pedido';
import { Produto } from './produto';
import { CommonHistory } from './common-history';

export class PedidoItem extends CommonHistory {
  constructor(partial: Partial<PedidoItem>) {
    super();
    Object.assign(this, partial);
  }
  id: number;
  idProduto: number;
  produto: Produto;
  idPedido: number;
  pedido: Pedido;
  quantidade: number;
  observacao: string;
  total: number;
}
