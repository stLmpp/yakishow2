import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CreateInstanceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(response => {
        if (
          response.type === HttpEventType.Response &&
          request.headers.has('yk-type')
        ) {
          return response.clone({
            body: this.createInstance(
              request.headers.get('yk-type'),
              response.body
            ),
          });
        }
        return response;
      })
    );
  }

  createInstance(type: string, responseBody: any): any {
    if (responseBody && type) {
      const realType = instances[type];
      if (realType) {
        return plainToClass(realType, responseBody);
      }
    }
    return responseBody;
  }
}

const instances = {};
let counter = 0;

export const createInstanceHeaders = (
  type: any,
  headers: HttpHeaders = new HttpHeaders()
): HttpHeaders => {
  if (typeof type['yk-type'] !== 'undefined') {
    return headers.set('yk-type', type['yk-type']);
  } else {
    return headers;
  }
};

export function CreateInstance(): any {
  return (target: any) => {
    target['yk-type'] = '' + counter++;
    instances[target['yk-type']] = target;
  };
}
