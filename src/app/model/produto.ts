import { CommonHistory } from './common-history';
import { LabelValue } from './label-value';

export class Produto extends CommonHistory {
  constructor(partial?: Partial<Produto>) {
    super();
    this.setValues(partial);
  }
  id: number;
  descricao: string;
  codigo: string;
  valor: number;
  ativo: boolean;

  hasPedido?: boolean;

  setValues(values: Partial<Produto> = {}): void {
    Object.assign(this, values);
    if (values?.valor) this.valor = parseFloat('' + values.valor);
  }
}

export const getProdutoKeys = (): LabelValue<keyof Produto>[] => [
  {
    label: 'Id',
    value: 'id',
  },
  {
    label: 'Código',
    value: 'codigo',
  },
  {
    label: 'Descrição',
    value: 'descricao',
  },
  {
    label: 'Valor',
    value: 'valor',
  },
];
