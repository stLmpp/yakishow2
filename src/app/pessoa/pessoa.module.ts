import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PessoaComponent } from './pessoa.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { NgxMaskModule } from 'ngx-mask';
import { PessoaItemComponent } from './pessoa-item/pessoa-item.component';
import { PessoaNovoQuickComponent } from './pessoa-novo-quick/pessoa-novo-quick.component';
import { ValidatorsModule } from '../validators/validators.module';

@NgModule({
  declarations: [
    PessoaComponent,
    PessoaItemComponent,
    PessoaNovoQuickComponent,
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    SharedModule,
    VirtualScrollerModule,
    NgxMaskModule.forChild(),
    ValidatorsModule,
  ],
})
export class PessoaModule {}
