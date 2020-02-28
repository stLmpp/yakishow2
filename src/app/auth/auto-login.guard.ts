import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './state/auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let autoLogin = this.authService.autoLogin();
    if (!autoLogin) autoLogin = of(null);
    return autoLogin.pipe(
      map(() => {
        if (state.url === '/') {
          return this.router.parseUrl('/home');
        }
        return true;
      })
    );
  }
}
