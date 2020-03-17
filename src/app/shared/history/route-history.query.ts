import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RouteHistoryStore, RouteHistoryState } from './route-history.store';
import { RouteHistory } from '../../model/route-history';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouteHistoryQuery extends QueryEntity<RouteHistoryState> {
  constructor(protected store: RouteHistoryStore) {
    super(store);
  }

  hasHistory$ = this.selectAll().pipe(map(({ length }) => length > 1));

  hasHistory(): boolean {
    return this.getAll().length > 1;
  }

  getLastCustom(times = 1): RouteHistory {
    const all = [...this.getAll()].reverse();
    return all.find((_, index) => index === times);
  }

  getLastId(): number {
    const all = this.getAll();
    return all[all.length - 1]?.id;
  }
}
