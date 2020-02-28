import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProdutoComponent } from './produto.component';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { NgxMaskModule } from 'ngx-mask';
import { UniqueCodigoDirective } from './produto-item/unique-codigo.directive';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ProdutoComponent, ProdutoItemComponent, UniqueCodigoDirective],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
    MatCheckboxModule,
  ],
})
export class ProdutoModule {}
