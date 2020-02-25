import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from './state/auth.query';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authQuery: AuthQuery, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authQuery.isLogged$.pipe(
      map(isLogged => {
        if (isLogged) return true;
        return this.router.parseUrl('home');
      })
    );
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.canActivate();
  }

  canLoad(): Observable<boolean> {
    return this.authQuery.isLogged$;
  }
}
