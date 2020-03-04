import { Component, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { slideX } from '../shared/animations';
import { Observable } from 'rxjs';
import { AuthQuery } from '../auth/state/auth.query';

export interface Sidenav {
  routerLink: any[] | string;
  auth?: Observable<boolean>;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideX('RTL')],
})
export class SidenavComponent implements OnInit {
  constructor(
    public sidenavService: SidenavService,
    public authQuery: AuthQuery
  ) {}

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

  ngOnInit(): void {}
}
