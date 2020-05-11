import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthStore } from './auth.store';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../model/user';
import { Observable, throwError } from 'rxjs';
import { AuthQuery } from './auth.query';
import { Router } from '@angular/router';
import { ThemesEnum } from '../../model/themes.enum';
import { UpdateResult } from '../../model/update-result';
import { setLoading } from '@datorama/akita';

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
    return this.http.get<User>('/auth/auto-login').pipe(
      setLoading(this.authStore),
      tap(user => {
        this.authStore.update({ user });
      }),
      catchError(err => {
        this.authStore.update({ user: null, token: null });
        return throwError(err);
      })
    );
  }

  loginApi(username: string, password: string): Observable<User> {
    return this.http
      .post<User>('/auth/login', { username, password })
      .pipe(
        setLoading(this.authStore),
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

  updateTheme(id: number, theme: ThemesEnum): Observable<UpdateResult> {
    this.authStore.update(state => ({
      ...state,
      user: { ...state.user, theme },
    }));
    const params = new HttpParams().set('theme', '' + theme);
    return this.http.patch<UpdateResult>(`user/${id}/theme`, undefined, {
      params,
    });
  }
}
