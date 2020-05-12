import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPedidoFormComponent } from './novo-pedido-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { matExpansionPanelProvider } from '../../../util/testing';

describe('NovoPedidoFormComponent', () => {
  let component: NovoPedidoFormComponent;
  let fixture: ComponentFixture<NovoPedidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoPedidoFormComponent],
      imports: [HttpClientModule, MatExpansionModule],
      providers: [matExpansionPanelProvider],
    }).compileComponents();
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
