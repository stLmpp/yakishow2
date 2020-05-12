import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from './pessoa.component';
import { PessoaResolver } from './pessoa.resolver';
import { RouteParamsEnum } from '../model/route-params.enum';
import { PessoaItemComponent } from './pessoa-item/pessoa-item.component';
import { PessoaItemResolver } from './pessoa-item/pessoa-item.resolver';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent,
    resolve: [PessoaResolver],
    data: { animation: 'Pessoas' },
  },
  {
    path: `edit/:${RouteParamsEnum.idPessoa}`,
    component: PessoaItemComponent,
    resolve: [PessoaItemResolver],
    data: { animation: 'PessoaItem' },
  },
  {
    path: 'novo',
    component: PessoaItemComponent,
    data: { animation: 'PessoaItem' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
