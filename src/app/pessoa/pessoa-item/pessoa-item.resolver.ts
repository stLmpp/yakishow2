import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Pessoa } from '../../model/pessoa';
import { Observable } from 'rxjs';
import { PessoaQuery } from '../state/pessoa.query';
import { PessoaService } from '../state/pessoa.service';
import { RouterParamsEnum } from '../../model/router-params.enum';

@Injectable({ providedIn: 'root' })
export class PessoaItemResolver implements Resolve<Pessoa> {
  constructor(
    private pessoaQuery: PessoaQuery,
    private pessoaService: PessoaService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pessoa> | Promise<Pessoa> | Pessoa {
    const idPessoa = route.params[RouterParamsEnum.idPessoa];
    const pessoa = this.pessoaQuery.getEntity(idPessoa);
    return pessoa ? pessoa : this.pessoaService.getById(idPessoa);
  }
}
