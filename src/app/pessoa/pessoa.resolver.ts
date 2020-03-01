import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Pessoa } from '../model/pessoa';
import { Observable } from 'rxjs';
import { PessoaService } from './state/pessoa.service';

@Injectable({ providedIn: 'root' })
export class PessoaResolver implements Resolve<Pessoa[]> {
  constructor(private pessoaService: PessoaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pessoa[]> | Promise<Pessoa[]> | Pessoa[] {
    return this.pessoaService.getAll();
  }
}
