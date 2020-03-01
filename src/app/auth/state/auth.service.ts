import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from './auth.store';
import { catchError, finalize, tap } from 'rxjs/operators';
import { User } from '../../model/user';
import { Observable, throwError } from 'rxjs';
import { AuthQuery } from './auth.query';
import { Router } from '@angular/router';
import { createInstanceHeaders } from '../../core/create-instance/create-instance.interceptor';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private http: HttpClient,
    private authQuery: AuthQuery,
    private router: Router
  ) {}

  autoLogin(): Observable<User> {
    const token = this.authQuery.getTokenSnapshot();
    const loggedUser = this.authQuery.getUserSnapshot();
    if (!token || !!loggedUser) return;
    this.authStore.setLoading(true);
    return this.http
      .get<User>('/auth/auto-login', { headers: createInstanceHeaders(User) })
      .pipe(
        finalize(() => {
          this.authStore.setLoading(false);
        }),
        tap(user => {
          this.authStore.update({ user });
        })
      );
  }

  loginApi(username: string, password: string): Observable<User> {
    this.authStore.setLoading(true);
    return this.http
      .post<User>(
        '/auth/login',
        { username, password },
        { headers: createInstanceHeaders(User) }
      )
      .pipe(
        finalize(() => {
          this.authStore.setLoading(false);
        }),
        tap(user => {
          this.authStore.update({ token: user.token, user });
        }),
        catchError(error => {
          this.authStore.setError(error.error);
          return throwError(error);
        })
      );
  }

  logout(): void {
    this.authStore.update({ user: null, token: null });
    this.router.navigateByUrl('/home');
  }
}
