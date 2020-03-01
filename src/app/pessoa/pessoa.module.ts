import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PessoaComponent } from './pessoa.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { NgxMaskModule } from 'ngx-mask';
import { PessoaItemComponent } from './pessoa-item/pessoa-item.component';
import { UniqueCelularDirective } from './unique-celular.directive';
import { UniqueEmailDirective } from './unique-email.directive';

@NgModule({
  declarations: [
    PessoaComponent,
    PessoaItemComponent,
    UniqueCelularDirective,
    UniqueEmailDirective,
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    SharedModule,
    VirtualScrollerModule,
    NgxMaskModule.forChild(),
  ],
})
export class PessoaModule {}
