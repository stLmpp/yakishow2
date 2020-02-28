import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto.component';
import { ProdutoResolver } from './produto.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProdutoComponent,
    resolve: [ProdutoResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
