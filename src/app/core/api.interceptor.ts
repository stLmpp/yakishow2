import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    _req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = _req.clone({ url: this.handleUrl(_req.url) });
    return next.handle(req);
  }

  handleUrl(url: string): string {
    return `${environment.api}${url.startsWith('/') ? url : '/' + url}`;
  }
}
