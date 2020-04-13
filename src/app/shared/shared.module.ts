import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { YkLetDirective } from './let/yk-let.directive';
import { environment } from '../../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { YkDisabledControlDirective } from './disabled-control/yk-disabled-control.directive';
import { SearchPipe } from './search/search.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { DialogComponent } from './dialog/dialog.component';
import { YkSwipeActionsDirective } from './swipe-actions/yk-swipe-actions.directive';
import { SwipeActionComponent } from './swipe-actions/swipe-action.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './card/cards.component';
import { MatRippleModule } from '@angular/material/core';
import { YkFabFloatingDirective } from './fab-floating/yk-fab-floating.directive';
import { FilterPipe } from './filter/filter.pipe';
import { GetDeepPipe } from './get-deep/get-deep.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SumByPipe } from './sum-by/sum-by.pipe';

const DECLARATIONS = [
  environment.production ? [] : HammerjsDirective,
  YkLetDirective,
  YkDisabledControlDirective,
  SearchPipe,
  OrderByPipe,
  ScrollToTopComponent,
  DialogComponent,
  YkSwipeActionsDirective,
  SwipeActionComponent,
  CardComponent,
  CardsComponent,
  YkFabFloatingDirective,
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
  FormsModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  OverlayModule,
  MatRippleModule,
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
    FilterPipe,
    GetDeepPipe,
    ConfirmDialogComponent,
    SumByPipe,
  ],
  exports: [...DECLARATIONS, ...MODULES, GetDeepPipe, SumByPipe, FilterPipe],
  imports: [CommonModule, ...MODULES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
