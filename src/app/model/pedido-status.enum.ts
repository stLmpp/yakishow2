export enum PedidoStatusEnum {
  pendente,
  preparando,
  despachado,
  finalizado,
  cancelado,
}

export interface LabelValue<T = any> {
  label: string;
  value: T;
}

export const pedidoStatusArray = (): LabelValue<number>[] => [
  {
    label: 'Pendente',
    value: PedidoStatusEnum.pendente,
  },
  {
    label: 'Preparando',
    value: PedidoStatusEnum.preparando,
  },
  {
    label: 'Despachado',
    value: PedidoStatusEnum.despachado,
  },
  {
    label: 'Finalizado',
    value: PedidoStatusEnum.finalizado,
  },
  {
    label: 'Cancelado',
    value: PedidoStatusEnum.cancelado,
  },
];
