import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaItemComponent } from './pessoa-item.component';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PessoaItemComponent', () => {
  let component: PessoaItemComponent;
  let fixture: ComponentFixture<PessoaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaItemComponent],
      imports: [
        AkitaNgRouterStoreModule.forRoot(),
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
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
