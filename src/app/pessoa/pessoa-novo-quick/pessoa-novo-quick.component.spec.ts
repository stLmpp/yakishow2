import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaNovoQuickComponent } from './pessoa-novo-quick.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { matDialogRefProvider } from '../../util/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PessoaNovoQuickComponent', () => {
  let component: PessoaNovoQuickComponent;
  let fixture: ComponentFixture<PessoaNovoQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaNovoQuickComponent],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      providers: [matDialogRefProvider],
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
