import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthQuery } from './state/auth.query';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authQuery: AuthQuery) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authQuery.getTokenSnapshot();
    const headers = req.headers.append('Authorization', `Bearer ${token}`);
    const reqClone = req.clone({ headers });
    return next.handle(reqClone);
  }
}
