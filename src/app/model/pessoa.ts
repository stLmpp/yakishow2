import { CommonHistory } from './common-history';
import { PessoaTipo } from './pessoa-tipo';
import { CreateInstance } from '../core/create-instance/create-instance.interceptor';

@CreateInstance()
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
