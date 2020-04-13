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
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { PedidosDiaComponent } from './pedidos-dia/pedidos-dia.component';
import { PedidoItemComponent } from './pedido-item/pedido-item.component';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PedidoStatusPipe } from './pedido-status.pipe';

@NgModule({
  declarations: [
    PedidoComponent,
    NovoPedidoComponent,
    NovoPedidoFormComponent,
    PedidosDiaComponent,
    PedidoItemComponent,
    PedidosPesquisaComponent,
    PedidoStatusPipe,
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
    MatNativeDateModule,
    MatDatepickerModule,
    LayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
  ],
})
export class PedidoModule {}
