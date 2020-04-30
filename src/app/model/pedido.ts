import { CommonHistory } from './common-history';
import { Pessoa } from './pessoa';
import { PedidoItem } from './pedido-item';
import { PedidoStatusEnum } from './pedido-status.enum';
import { LabelValue } from './label-value';

export class Pedido extends CommonHistory {
  constructor(partial: Partial<Pedido>) {
    super();
    Object.assign(this, partial);
  }
  id: number;
  status: PedidoStatusEnum;
  idCliente: number;
  cliente?: Pessoa;
  idEntregador: number;
  entregador?: Pessoa;
  pedidoItems: PedidoItem[];
  dataFinalizado?: Date;
}

export interface PedidoGetByParamsPayload {
  dataCriacao?: Date;
  dataFinalizado?: Date;
  idCliente?: number;
  status?: PedidoStatusEnum;
  produto?: string;
  idProduto?: number;
}

export type UpdatePedidoDto = Partial<
  Pick<Pedido, 'status' | 'idEntregador' | 'idCliente'>
>;

export const getPedidoKeys = (): LabelValue<keyof Pedido | string>[] => [
  {
    label: 'Id',
    value: 'id',
  },
  {
    label: 'Data de crição',
    value: 'creationDate',
  },
  {
    label: 'Cliente',
    value: 'cliente.nome',
  },
  {
    label: 'Status',
    value: 'status',
  },
  {
    label: 'Produto',
    value: 'produto.descricao',
  },
];
