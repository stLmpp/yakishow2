import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from './pessoa.component';
import { PessoaResolver } from './pessoa.resolver';
import { RouterParamsEnum } from '../model/router-params.enum';
import { PessoaItemComponent } from './pessoa-item/pessoa-item.component';
import { PessoaItemResolver } from './pessoa-item/pessoa-item.resolver';
import {
  navigateBackDisabled,
  navigateBackUrl,
} from '../shared/navigate-back/navigate-back.component';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent,
    resolve: [PessoaResolver],
    data: { animation: 'Pessoas', [navigateBackDisabled]: true },
  },
  {
    path: `edit/:${RouterParamsEnum.idPessoa}`,
    component: PessoaItemComponent,
    resolve: [PessoaItemResolver],
    data: { animation: 'PessoaItem', [navigateBackUrl]: '/pessoas' },
  },
  {
    path: 'novo',
    component: PessoaItemComponent,
    data: { animation: 'PessoaItem', [navigateBackUrl]: '/pessoas' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
