import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaNovoQuickComponent } from './pessoa-novo-quick.component';

describe('PessoaNovoQuickComponent', () => {
  let component: PessoaNovoQuickComponent;
  let fixture: ComponentFixture<PessoaNovoQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaNovoQuickComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaNovoQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
