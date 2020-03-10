import { CommonHistory } from './common-history';

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

  setValues(values: Partial<Produto> = {}): void {
    Object.assign(this, values);
    if (values?.valor) this.valor = parseFloat('' + values.valor);
  }
}
