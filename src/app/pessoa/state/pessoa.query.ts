import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PessoaState, PessoaStore } from './pessoa.store';

@Injectable({ providedIn: 'root' })
export class PessoaQuery extends QueryEntity<PessoaState> {
  constructor(protected store: PessoaStore) {
    super(store);
  }

  all$ = this.selectAll();
}
