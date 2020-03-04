import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { NovoPedidoFormComponent } from './novo-pedido/novo-pedido-form/novo-pedido-form.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [PedidoComponent, NovoPedidoComponent, NovoPedidoFormComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
    MatAutocompleteModule,
  ],
})
export class PedidoModule {}
