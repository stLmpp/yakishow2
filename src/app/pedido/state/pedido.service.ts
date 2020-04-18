import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoStore } from './pedido.store';
import { Observable } from 'rxjs';
import {
  Pedido,
  PedidoGetByParamsPayload,
  UpdatePedidoDto,
} from '../../model/pedido';
import { tap } from 'rxjs/operators';
import { HttpParams } from '../../util/http-params';
import { PedidoStatusEnum } from '../../model/pedido-status.enum';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  constructor(private pedidoStore: PedidoStore, private http: HttpClient) {}

  private target = 'pedido';
  private targetItem = 'pedido-item';

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

  patchPedido(idPedido: number, partial: UpdatePedidoDto): Observable<Pedido> {
    this.pedidoStore.update(idPedido, partial);
    return this.http.patch<Pedido>(`${this.target}/${idPedido}`, partial).pipe(
      tap(pedido => {
        this.pedidoStore.update(idPedido, pedido);
      })
    );
  }

  updateStatus(idPedido: number, status: PedidoStatusEnum): Observable<Pedido> {
    this.pedidoStore.update(idPedido, { status });
    return this.http
      .put<Pedido>(`${this.target}/${idPedido}/status/${status}`, undefined)
      .pipe(
        tap(pedido => {
          this.pedidoStore.update(idPedido, pedido);
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
    return this.http
      .get<Pedido[]>(`${this.target}/params`, { params })
      .pipe(
        tap(pedidos => {
          this.pedidoStore.upsertMany(pedidos);
        })
      );
  }

  getExistsProduto(idProduto: number): Observable<boolean> {
    const params = new HttpParams({ idProduto });
    return this.http.get<boolean>(`${this.targetItem}/exists/produto`, {
      params,
    });
  }
}
