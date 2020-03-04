import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPedidoFormComponent } from './novo-pedido-form.component';

describe('NovoPedidoFormComponent', () => {
  let component: NovoPedidoFormComponent;
  let fixture: ComponentFixture<NovoPedidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoPedidoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoPedidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
