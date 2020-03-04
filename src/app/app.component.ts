import { Component, OnDestroy, OnInit } from '@angular/core';
import { RTL, SLIDE_X, TTB } from './route-animations';
import { trigger } from '@angular/animations';
import { Subject } from 'rxjs';

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
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {}

  private _destroy$ = new Subject();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
