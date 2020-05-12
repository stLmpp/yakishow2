import { CommonHistory } from './common-history';
import { PessoaTipo } from './pessoa-tipo';
import { LabelValue } from './label-value';

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

export const getPessoaKeys = (): LabelValue<keyof Pessoa>[] => [
  { value: 'id', label: 'Id' },
  { value: 'celular', label: 'Celular' },
  { value: 'nome', label: 'Nome' },
  { value: 'endereco', label: 'Endereço' },
  { value: 'complemento', label: 'Complemento' },
  { value: 'cep', label: 'CEP' },
  { value: 'email', label: 'E-mail' },
];
