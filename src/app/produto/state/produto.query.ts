import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProdutoState, ProdutoStore } from './produto.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProdutoQuery extends QueryEntity<ProdutoState> {
  constructor(protected store: ProdutoStore) {
    super(store);
  }

  loading$ = this.selectLoading();
  all$ = this.selectAll();

  hasPedido(idProduto: number): Observable<boolean> {
    return this.all$.pipe(
      map(
        produtos =>
          produtos.find(produto => produto.id === idProduto)?.hasPedido
      )
    );
  }
}
