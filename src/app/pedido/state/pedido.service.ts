import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PedidoStore } from './pedido.store';
import { Observable } from 'rxjs';
import { Pedido } from '../../model/pedido';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  constructor(private pedidoStore: PedidoStore, private http: HttpClient) {}

  private target = 'pedido';

  getByDay(day?: Date): Observable<Pedido[]> {
    const params = new HttpParams({ fromObject: { day: day.toISOString() } });
    return this.http.get<Pedido[]>(`${this.target}/day`, { params });
  }
}
