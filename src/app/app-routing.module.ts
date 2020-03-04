import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutoLoginGuard } from './auth/auto-login.guard';
import { NotLoggedGuard } from './auth/not-logged.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AutoLoginGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { animation: 'Home' },
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [NotLoggedGuard],
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./produto/produto.module').then(m => m.ProdutoModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'pessoas',
        loadChildren: () =>
          import('./pessoa/pessoa.module').then(m => m.PessoaModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('./pedido/pedido.module').then(m => m.PedidoModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
