import { Injectable } from '@angular/core';
import { RouteHistoryStore } from './route-history.store';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteHistoryQuery } from './route-history.query';

@Injectable({ providedIn: 'root' })
export class RouteHistoryService {
  constructor(
    private routeHistoryStore: RouteHistoryStore,
    private router: Router,
    private routeHistoryQuery: RouteHistoryQuery
  ) {}

  private _destroy$ = new Subject();

  back(times = 1): void {
    const route = this.routeHistoryQuery.getLastCustom(times);
    if (!route) return;
    this.routeHistoryStore.remove(state => state.id >= route.id);
    this.router.navigateByUrl(route.url);
  }

  updateComponentInstance(instance: any): void {
    this.routeHistoryStore.update(this.routeHistoryQuery.getLastId(), {
      instance,
    });
  }

  init(): void {
    this.router.events.pipe(takeUntil(this._destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeHistoryStore.add({ id: event.id, url: event.url });
      }
    });
  }

  destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
