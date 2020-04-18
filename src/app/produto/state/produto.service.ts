import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdutoStore } from './produto.store';
import { Produto } from '../../model/produto';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UpdateResult } from '../../model/update-result';
import { cacheableCustom } from '../../util/akita';
import { setLoading } from '@datorama/akita';
import { HttpParams } from '../../util/http-params';
import { PedidoService } from '../../pedido/state/pedido.service';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  constructor(
    private produtoStore: ProdutoStore,
    private http: HttpClient,
    private pedidoService: PedidoService
  ) {}

  private target = 'produto';

  getBySimilarityCodigo(codigo: string): Observable<Produto[]> {
    const params = new HttpParams({ codigo });
    return this.http.get<Produto[]>(`${this.target}/similarity/codigo`, {
      params,
    });
  }

  getAll(): Observable<Produto[]> {
    return cacheableCustom(
      this.produtoStore,
      this.http.get<Produto[]>(`${this.target}/all`).pipe(
        setLoading(this.produtoStore),
        tap(produtos => {
          this.produtoStore.set(produtos);
        })
      )
    );
  }

  existsByCodigo(codigo: string, id?: number): Observable<boolean> {
    let params = new HttpParams().set('codigo', codigo);
    if (id) params = params.set('id', '' + id);
    return this.http.get<boolean>(`${this.target}/exists/codigo`, { params });
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.target, produto).pipe(
      tap(produtoCreated => {
        this.produtoStore.add(produtoCreated);
      })
    );
  }

  updateProduto(
    id: number,
    partial: Partial<Produto>
  ): Observable<UpdateResult> {
    return this.http.patch<UpdateResult>(`${this.target}/${id}`, partial).pipe(
      tap(() => {
        this.produtoStore.update(id, partial);
      })
    );
  }

  getBySearchAutocomplete(
    term: string,
    withPedido: boolean
  ): Observable<Produto[]> {
    const params = new HttpParams({
      term,
      withPedido,
      limit: '8',
    });
    return this.http.get<Produto[]>(`${this.target}/search`, { params });
  }

  getExistsPedido(idProduto: number): Observable<boolean> {
    return this.pedidoService.getExistsProduto(idProduto).pipe(
      tap(hasPedido => {
        this.produtoStore.update(idProduto, { hasPedido });
      })
    );
  }

  getById(idProduto: number): Observable<Produto> {
    return this.http
      .get<Produto>(`${this.target}/id/${idProduto}`)
      .pipe(tap(produto => this.produtoStore.upsert(idProduto, produto)));
  }
}
