import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PessoaState, PessoaStore } from './pessoa.store';
import { Pessoa } from '../../model/pessoa';

@Injectable({ providedIn: 'root' })
export class PessoaQuery extends QueryEntity<PessoaState> {
  constructor(protected store: PessoaStore) {
    super(store);
  }

  all$ = this.selectAll();

  getByCelular(celular: string): Pessoa {
    return this.getAll().find(o => o.celular === celular);
  }
}
