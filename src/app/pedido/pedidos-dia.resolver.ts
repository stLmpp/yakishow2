import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Pedido } from '../model/pedido';
import { Observable } from 'rxjs';
import { PedidoService } from './state/pedido.service';
import { parse } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class PedidosDiaResolver implements Resolve<Pedido[]> {
  constructor(private pedidoService: PedidoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pedido[]> | Promise<Pedido[]> | Pedido[] {
    return this.pedidoService.getByDay(
      route.queryParams.dia
        ? parse(route.queryParams.dia, 'dd-MM-yyyy', new Date())
        : new Date()
    );
  }
}
