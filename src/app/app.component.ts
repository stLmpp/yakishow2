import { Component, OnDestroy, OnInit } from '@angular/core';
import { RTL, SLIDE_X, TTB } from './route-animations';
import { trigger } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidenavService } from './sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      ...SLIDE_X('Pessoa', 'PessoaItem'),
      TTB('*', 'AuthLogin'),
      RTL('AuthLogin', '*'),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private sidenavService: SidenavService) {}

  private _destroy$ = new Subject();

  handleRoutes(): void {
    this.router.events.pipe(takeUntil(this._destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenavService.close();
      }
    });
  }

  ngOnInit(): void {
    this.handleRoutes();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
