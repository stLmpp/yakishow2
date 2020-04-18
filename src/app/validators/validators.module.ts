import { NgModule } from '@angular/core';
import { UniqueCelularDirective } from './unique-celular/unique-celular.directive';
import { UniqueEmailDirective } from './unique-email/unique-email.directive';
import { UniqueCodigoDirective } from './unique-codigo/unique-codigo.directive';

const DECLARATIONS = [
  UniqueCelularDirective,
  UniqueEmailDirective,
  UniqueCodigoDirective,
];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
})
export class ValidatorsModule {}
