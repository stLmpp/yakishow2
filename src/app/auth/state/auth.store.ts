import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Auth } from './auth.model';

export function createInitialState(): Auth {
  return {
    token: null,
    user: null,
    loading: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<Auth> {
  constructor() {
    super(createInitialState());
  }
}
