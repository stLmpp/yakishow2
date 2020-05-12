import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore } from './auth.store';
import { User } from '../../model/user';
import { Auth } from './auth.model';
import { distinctUntilChanged, filter, pluck } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<Auth> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  loading$ = this.selectLoading();

  isLogged$ = this.select(state => {
    return !!(state?.token && state?.user?.token);
  });

  user$ = this.select('user');
  theme$ = this.select('user').pipe(
    filter(o => !!o),
    pluck('theme')
  );

  themeChanged$ = this.theme$.pipe(distinctUntilChanged());

  getTokenSnapshot(): string {
    return this.getValue().token;
  }

  getUserSnapshot(): User {
    return this.getValue().user;
  }

  isLogged(): boolean {
    const authState = this.getValue();
    return !!authState?.user?.token && !!authState?.token;
  }
}
