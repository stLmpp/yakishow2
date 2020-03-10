import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerjsDirective } from './hammerjs/hammerjs.directive';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgLetDirective } from './ng-let/ng-let.directive';
import { environment } from '../../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DisabledControlDirective } from './disabled-control/disabled-control.directive';
import { FilterPipe } from './filter/filter.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { DialogComponent } from './dialog/dialog.component';
import { SwipeActionsDirective } from './swipe-actions/swipe-actions.directive';
import { SwipeActionComponent } from './swipe-actions/swipe-action.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './card/cards.component';
import { MatRippleModule } from '@angular/material/core';

const DECLARATIONS = [
  environment.production ? [] : HammerjsDirective,
  NgLetDirective,
  DisabledControlDirective,
  FilterPipe,
  OrderByPipe,
  ScrollToTopComponent,
  DialogComponent,
  SwipeActionsDirective,
  SwipeActionComponent,
  CardComponent,
  CardsComponent,
];
const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  OverlayModule,
];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS, ...MODULES],
  imports: [CommonModule, ...MODULES, MatRippleModule],
})
export class SharedModule {}
