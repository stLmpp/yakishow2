import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './state/auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

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
    return autoLogin.pipe(map(() => true));
  }
}
