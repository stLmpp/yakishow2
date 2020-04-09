import { CommonHistory } from './common-history';
import { Pessoa } from './pessoa';
import { PedidoItem } from './pedido-item';
import { PedidoStatusEnum } from './pedido-status.enum';

export class Pedido extends CommonHistory {
  id: number;
  status: PedidoStatusEnum;
  clienteId: number;
  cliente?: Pessoa;
  entregadorId: number;
  entregador?: Pessoa;
  pedidoItems: PedidoItem[];
}

export interface PedidoGetByParamsPayload {
  dataCriacao?: Date;
  dataFinalizado?: Date;
  clienteId?: number;
  status?: PedidoStatusEnum;
  produto?: string;
  produtoId?: number;
}
