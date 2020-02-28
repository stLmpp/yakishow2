import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoItemComponent } from './produto-item.component';

describe('ProdutoItemComponent', () => {
  let component: ProdutoItemComponent;
  let fixture: ComponentFixture<ProdutoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
