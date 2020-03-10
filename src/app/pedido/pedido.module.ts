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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { PedidosDiaComponent } from './pedidos-dia/pedidos-dia.component';

@NgModule({
  declarations: [
    PedidoComponent,
    NovoPedidoComponent,
    NovoPedidoFormComponent,
    PedidosDiaComponent,
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    SharedModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatCardModule,
    MatRippleModule,
  ],
})
export class PedidoModule {}
