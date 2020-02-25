import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from './state/auth.query';

@Injectable({ providedIn: 'root' })
export class NotLoggedGuard implements CanActivate, CanLoad {
  constructor(private authQuery: AuthQuery, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authQuery.isLogged()) {
      return this.router.parseUrl('home');
    } else {
      return true;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return !this.authQuery.isLogged();
  }
}
