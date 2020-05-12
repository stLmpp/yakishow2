import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Pessoa } from '../../model/pessoa';

export interface PessoaState extends EntityState<Pessoa> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pessoa', cache: { ttl: 600000 } })
export class PessoaStore extends EntityStore<PessoaState> {
  constructor() {
    super({ loading: false, search: null });
  }
}
