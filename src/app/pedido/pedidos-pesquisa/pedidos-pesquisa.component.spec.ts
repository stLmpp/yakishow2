import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPesquisaComponent } from './pedidos-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { RouterTestingModule } from '@angular/router/testing';

describe('PedidosPesquisarComponent', () => {
  let component: PedidosPesquisaComponent;
  let fixture: ComponentFixture<PedidosPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosPesquisaComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        AkitaNgRouterStoreModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
