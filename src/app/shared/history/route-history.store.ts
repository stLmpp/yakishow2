import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RouteHistory } from '../../model/route-history';

export interface RouteHistoryState extends EntityState<RouteHistory> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'history' })
export class RouteHistoryStore extends EntityStore<RouteHistoryState> {
  constructor() {
    super();
  }
}
