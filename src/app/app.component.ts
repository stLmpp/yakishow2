import { Component, OnDestroy, OnInit } from '@angular/core';
import { LTR, RTL, SLIDE_X, TTB } from './route-animations';
import { trigger } from '@angular/animations';
import { Subject } from 'rxjs';
import { AuthQuery } from './auth/state/auth.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      ...SLIDE_X('Pessoas', 'PessoaItem'),
      TTB('*', 'AuthLogin'),
      RTL('AuthLogin', '*'),
      RTL('*', 'Produtos'),
      ...SLIDE_X('Pedidos', 'NovoPedido'),
      ...SLIDE_X('Pedidos', 'PedidosDia'),
      LTR('NovoPedido', 'PedidoItem'),
      ...SLIDE_X('PedidosPesquisa', 'PedidoItem'),
      LTR('Home', '*'),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public authQuery: AuthQuery) {}

  private _destroy$ = new Subject();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
