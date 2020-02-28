export class Produto {
  constructor(partial?: Partial<Produto>) {
    this.setValues(partial);
  }

  id: number;
  descricao: string;
  codigo: string;
  valor: number;
  ativo: boolean;
  creationDate: Date;
  lastUpdateDate: Date;

  setValues(values: Partial<Produto> = {}): void {
    Object.assign(this, values);
    if (values?.valor) this.valor = parseFloat('' + values.valor);
  }
}
