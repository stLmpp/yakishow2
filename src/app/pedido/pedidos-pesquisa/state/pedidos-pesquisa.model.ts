import { PedidoStatusEnum } from '../../../model/pedido-status.enum';

export interface PedidosPesquisa {
  form: PedidosPesquisaForm;
}

export interface PedidosPesquisaForm {
  dataCriacao: Date;
  dataFinalizado: Date;
  cliente: string;
  clienteId: number;
  produtoId: number;
  produto: string;
  status: PedidoStatusEnum;
}
