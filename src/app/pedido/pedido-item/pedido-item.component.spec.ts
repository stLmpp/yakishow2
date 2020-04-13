import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoItemComponent } from './pedido-item.component';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PedidoItemComponent', () => {
  let component: PedidoItemComponent;
  let fixture: ComponentFixture<PedidoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoItemComponent],
      imports: [
        AkitaNgRouterStoreModule.forRoot(),
        SharedModule.forRoot(),
        RouterTestingModule,
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
