import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

const DECLARATIONS = [LoginComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
