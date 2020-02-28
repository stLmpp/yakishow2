import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs';
import { ProdutoService } from './state/produto.service';

@Injectable({ providedIn: 'root' })
export class ProdutoResolver implements Resolve<Produto[]> {
  constructor(private produtoService: ProdutoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Produto[]> | Promise<Produto[]> | Produto[] {
    return this.produtoService.getAll();
  }
}
