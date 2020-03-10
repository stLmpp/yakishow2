import { CommonHistory } from './common-history';
import { PessoaTipo } from './pessoa-tipo';

export class Pessoa extends CommonHistory {
  constructor(partial?: Partial<Pessoa>) {
    super();
    Object.assign(this, partial);
  }
  id?: number;
  nome: string;
  celular: string;
  endereco: string;
  complemento: string;
  cep: string;
  email: string;
  tipos: PessoaTipo[];

  // UI
  loading?: boolean;
}
