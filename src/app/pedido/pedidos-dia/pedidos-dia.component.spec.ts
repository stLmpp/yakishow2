import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosDiaComponent } from './pedidos-dia.component';

describe('PedidosDiaComponent', () => {
  let component: PedidosDiaComponent;
  let fixture: ComponentFixture<PedidosDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosDiaComponent],
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
