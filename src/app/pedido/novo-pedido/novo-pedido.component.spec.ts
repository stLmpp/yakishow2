import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPedidoComponent } from './novo-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

describe('NovoPedidoComponent', () => {
  let component: NovoPedidoComponent;
  let fixture: ComponentFixture<NovoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoPedidoComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        RouterTestingModule,
        MatSnackBarModule,
        AkitaNgRouterStoreModule.forRoot(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
