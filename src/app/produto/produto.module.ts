import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProdutoComponent } from './produto.component';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ValidatorsModule } from '../validators/validators.module';

@NgModule({
  declarations: [ProdutoComponent, ProdutoItemComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule,
    NgxCurrencyModule,
    MatCheckboxModule,
    ValidatorsModule,
  ],
})
export class ProdutoModule {}
