import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosDiaComponent } from './pedidos-dia.component';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('PedidosDiaComponent', () => {
  let component: PedidosDiaComponent;
  let fixture: ComponentFixture<PedidosDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosDiaComponent],
      imports: [
        MatDialogModule,
        AkitaNgRouterStoreModule.forRoot(),
        SharedModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
