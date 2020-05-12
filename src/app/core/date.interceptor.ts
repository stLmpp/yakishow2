import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isArray, isPlainObject } from 'is-what';

// tslint:disable-next-line:max-line-length
export const isoDateReg = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

@Injectable({ providedIn: 'root' })
export class DateInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map(resp => {
        if (resp.type === HttpEventType.Response && resp.body) {
          return resp.clone({ body: this.handleAny(resp.body) });
        }
        return resp;
      })
    );
  }

  handleAny(value: any): any {
    if (isArray(value)) {
      return this.handleArray(value);
    } else if (isPlainObject(value)) {
      return this.handleObject(value);
    }
    return value;
  }

  handleObject(value: object): any {
    return Object.keys(value).reduce((newObject, key) => {
      let property = value[key];
      if (isArray(property)) {
        property = this.handleArray(property);
      } else if (isPlainObject(property)) {
        property = this.handleObject(property);
      } else if (this.isIsoDate(key, property)) {
        property = new Date(property);
      }
      return {
        ...newObject,
        [key]: property,
      };
    }, {});
  }

  handleArray(value: any[]): any {
    return value.reduce((newArray, item) => {
      if (isArray(item)) {
        item = this.handleArray(item);
      } else if (isPlainObject(item)) {
        item = this.handleObject(item);
      }
      return [...newArray, item];
    }, []);
  }

  isIsoDate(key: string, value: any): boolean {
    return key && value && isoDateReg.test(value);
  }
}
