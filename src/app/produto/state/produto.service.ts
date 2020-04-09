import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProdutoStore } from './produto.store';
import { Produto } from '../../model/produto';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UpdateResult } from '../../model/update-result';
import { cacheableCustom } from '../../util/akita';
import { setLoading } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  constructor(private produtoStore: ProdutoStore, private http: HttpClient) {}

  private target = 'produto';

  getBySimilarityCodigo(codigo: string): Observable<Produto[]> {
    const params = new HttpParams({ fromObject: { codigo } });
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
      fromObject: { term, withPedido: '' + withPedido, limit: '8' },
    });
    return this.http.get<Produto[]>(`${this.target}/search`, { params });
  }
}
