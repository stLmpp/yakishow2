import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProdutoComponent } from './produto.component';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { YkUniqueCodigoDirective } from './produto-item/yk-unique-codigo.directive';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ProdutoComponent,
    ProdutoItemComponent,
    YkUniqueCodigoDirective,
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule,
    NgxCurrencyModule,
    MatCheckboxModule,
  ],
})
export class ProdutoModule {}
