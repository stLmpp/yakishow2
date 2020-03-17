import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { RouteHistoryService } from '../history/route-history.service';
import { RouteHistoryQuery } from '../history/route-history.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fadeInOut } from '../animations';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

export const navigateBackDisabled = 'navigateBackDisabled';
export const navigateBackUrl = 'navigateBackUrl';

export interface NavigateBack {
  onNavigateBack(activatedRouteSnapshot: ActivatedRouteSnapshot): void;
}

@Component({
  selector: 'app-navigate-back',
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss'],
  animations: [fadeInOut],
})
export class NavigateBackComponent implements OnInit, OnDestroy {
  constructor(
    private routeHistoryService: RouteHistoryService,
    private routeHistoryQuery: RouteHistoryQuery,
    private routerQuery: RouterQuery,
    private router: Router
  ) {}

  @Input() floating: boolean;
  @Input() bottom: boolean;
  @Input() top: boolean;
  @Input() left: boolean;
  @Input() right: boolean;
  @Input() miniFab: boolean;

  hasHistory$: Observable<boolean>;
  back$: Observable<string>;
  disabled$: Observable<boolean>;

  navigateBack(back?: string): void {
    if (!this.routeHistoryQuery.hasHistory() && back) {
      this.router.navigateByUrl(back);
    } else {
      this.routeHistoryService.back();
    }
  }

  ngOnInit(): void {
    this.disabled$ = this.routerQuery.selectData<boolean>(navigateBackDisabled);
    this.back$ = this.routerQuery.selectData<string>(navigateBackUrl);
    this.routeHistoryService.init();
    this.hasHistory$ = this.routeHistoryQuery.hasHistory$;
  }
  ngOnDestroy(): void {
    this.routeHistoryService.destroy();
  }
}
