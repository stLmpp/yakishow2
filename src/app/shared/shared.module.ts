import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerjsDirective } from './hammerjs/hammerjs.directive';

const DECLARATIONS = [HammerjsDirective];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [CommonModule],
})
export class SharedModule {}
