import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoStore } from './pedido.store';
import { Observable } from 'rxjs';
import { Pedido, PedidoGetByParamsPayload } from '../../model/pedido';
import { tap } from 'rxjs/operators';
import { HttpParams } from '../../util/http-params';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  constructor(private pedidoStore: PedidoStore, private http: HttpClient) {}

  private target = 'pedido';

  getByDay(day: Date): Observable<Pedido[]> {
    const params = new HttpParams({ day });
    return this.http
      .get<Pedido[]>(`${this.target}/day`, { params })
      .pipe(
        tap(pedidos => {
          this.pedidoStore.add(pedidos);
        })
      );
  }

  postPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.target, pedido).pipe(
      tap(pedidoCreated => {
        this.pedidoStore.add(pedidoCreated);
      })
    );
  }

  getById(idPedido: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.target}/id/${idPedido}`).pipe(
      tap(pedido => {
        this.pedidoStore.upsert(idPedido, pedido);
      })
    );
  }

  getByParams(paramsPayload: PedidoGetByParamsPayload): Observable<Pedido[]> {
    const params = new HttpParams(paramsPayload);
    return this.http.get<Pedido[]>(`${this.target}/params`, { params });
  }
}
