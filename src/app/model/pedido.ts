import { CommonHistory } from './common-history';
import { Pessoa } from './pessoa';
import { PedidoItem } from './pedido-item';
import { PedidoStatusEnum } from './pedido-status.enum';
import { CreateInstance } from '../core/create-instance/create-instance.interceptor';

@CreateInstance()
export class Pedido extends CommonHistory {
  id: number;
  status: PedidoStatusEnum;
  dataInicio: Date;
  dataFinalizado: Date;
  clienteId: number;
  cliente: Pessoa;
  entregadorId: number;
  entregador: Pessoa;
  pedidoItems: PedidoItem[];
}
