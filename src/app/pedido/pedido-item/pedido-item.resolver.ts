import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { PedidoService } from '../state/pedido.service';
import { Observable } from 'rxjs';
import { RouterParamsEnum } from '../../model/router-params.enum';
import { Pedido } from '../../model/pedido';

@Injectable({ providedIn: 'root' })
export class PedidoItemResolver implements Resolve<Pedido> {
  constructor(private pedidoService: PedidoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pedido> | Promise<Pedido> | Pedido {
    return this.pedidoService.getById(route.params[RouterParamsEnum.idPedido]);
  }
}
