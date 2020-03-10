import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sidenav } from './sidenav.component';
import { AuthQuery } from '../auth/state/auth.query';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  constructor(private authQuery: AuthQuery) {}

  private _isOpen$ = new BehaviorSubject<boolean>(false);
  isOpen$ = this._isOpen$.asObservable();

  menus: Sidenav[] = [
    {
      icon: 'home',
      title: 'Início',
      routerLink: '/home',
    },
    {
      icon: 'people',
      title: 'Pessoas',
      routerLink: '/pessoas',
      auth: this.authQuery.isLogged$,
    },
    {
      icon: 'list',
      title: 'Produtos',
      routerLink: '/produtos',
      auth: this.authQuery.isLogged$,
    },
    {
      icon: 'menu_book',
      title: 'Pedidos',
      routerLink: '/pedidos',
      auth: this.authQuery.isLogged$,
    },
  ];

  open(): void {
    this._isOpen$.next(true);
  }

  close(): void {
    this._isOpen$.next(false);
  }

  toggle(): void {
    this._isOpen$.next(!this._isOpen$.value);
  }
}
