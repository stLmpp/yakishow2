import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoItemComponent } from './produto-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { matDialogRefProvider } from '../../util/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProdutoItemComponent', () => {
  let component: ProdutoItemComponent;
  let fixture: ComponentFixture<ProdutoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoItemComponent],
      imports: [MatDialogModule, HttpClientModule, MatSnackBarModule],
      providers: [matDialogRefProvider],
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
