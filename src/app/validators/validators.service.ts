import { Injectable } from '@angular/core';
import { PessoaService } from '../pessoa/state/pessoa.service';
import { AsyncValidatorFn } from '@angular/forms';
import { uniqueCelularValidator } from './unique-celular/unique-celular.directive';
import { uniqueEmailValidator } from './unique-email/unique-email.directive';
import { uniqueCodigoValidator } from './unique-codigo/unique-codigo.directive';
import { ProdutoService } from '../produto/state/produto.service';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  constructor(
    private pessoaService: PessoaService,
    private produtoService: ProdutoService
  ) {}

  uniqueCelular(idPessoa?: number): AsyncValidatorFn {
    return uniqueCelularValidator(this.pessoaService, idPessoa);
  }

  uniqueEmail(idPessoa?: number): AsyncValidatorFn {
    return uniqueEmailValidator(this.pessoaService, idPessoa);
  }

  uniqueCodigo(idProduto?: number): AsyncValidatorFn {
    return uniqueCodigoValidator(this.produtoService, idProduto);
  }
}
