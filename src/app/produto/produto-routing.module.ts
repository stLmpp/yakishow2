import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto.component';
import { ProdutoResolver } from './produto.resolver';
import { navigateBackDisabled } from '../shared/navigate-back/navigate-back.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutoComponent,
    resolve: [ProdutoResolver],
    data: { [navigateBackDisabled]: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
