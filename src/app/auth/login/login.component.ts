import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../state/auth.service';
import { AuthQuery } from '../state/auth.query';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    public authQuery: AuthQuery,
    private matDialogRef: MatDialogRef<LoginComponent>,
    private snackBarService: SnackBarService
  ) {}

  private _destroy$ = new Subject();

  hide = true;

  loginError: string;

  loginForm = new FormGroup({
    login: new FormControl(null, [
      Validators.required,
      this.loginValidator.bind(this),
    ]),
    password: new FormControl(null, [
      Validators.required,
      this.loginValidator.bind(this),
    ]),
  });

  loginValidator(): ValidationErrors | null {
    return this.loginError ? { loginError: true } : null;
  }

  onLogin(): void {
    const { login, password } = this.loginForm.value;
    this.authService
      .loginApi(login, password)
      .pipe(
        catchError(erro => {
          this.loginError = erro.error;
          this.loginForm.enable();
          return throwError(erro);
        })
      )
      .subscribe(() => {
        this.loginError = null;
        this.matDialogRef.close();
        this.snackBarService.open('Logado com sucesso!', 'Fechar');
      });
  }

  ngOnInit(): void {
    this.authQuery.loading$.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.loginForm[value ? 'disable' : 'enable']();
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
