import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RouteHistoryStore, RouteHistoryState } from './route-history.store';
import { RouteHistory } from '../../model/route-history';

@Injectable({ providedIn: 'root' })
export class RouteHistoryQuery extends QueryEntity<RouteHistoryState> {
  constructor(protected store: RouteHistoryStore) {
    super(store);
  }

  getLastCustom(times = 1): RouteHistory {
    const all = [...this.getAll()].reverse();
    return all.find((_, index) => index === times);
  }
}
