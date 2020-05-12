import { PedidoStatusEnum } from '../../../model/pedido-status.enum';

export interface PedidosPesquisa {
  form: PedidosPesquisaForm;
}

export interface PedidosPesquisaForm {
  dataCriacao: Date;
  dataFinalizado: Date;
  cliente: string;
  idCliente: number;
  idProduto: number;
  produto: string;
  status: PedidoStatusEnum;
}
