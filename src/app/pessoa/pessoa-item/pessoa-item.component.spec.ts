import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaItemComponent } from './pessoa-item.component';

describe('PessoaItemComponent', () => {
  let component: PessoaItemComponent;
  let fixture: ComponentFixture<PessoaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
