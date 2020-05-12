import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaComponent } from './pessoa.component';
import { WINDOW_PROVIDERS } from '../core/window.service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PessoaComponent', () => {
  let component: PessoaComponent;
  let fixture: ComponentFixture<PessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaComponent],
      providers: [...WINDOW_PROVIDERS],
      imports: [
        AkitaNgRouterStoreModule.forRoot(),
        RouterTestingModule,
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
