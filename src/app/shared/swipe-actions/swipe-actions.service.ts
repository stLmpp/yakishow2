import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SwipeActionsService {
  constructor() {}

  private _swipeUpdate = new Subject<string>();
  public swipeUpdate = this._swipeUpdate.asObservable();

  updateSwipe(id: string): void {
    this._swipeUpdate.next(id);
  }
}
