import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  private _loading$ = new BehaviorSubject<number[]>([]);
  public isLoading$ = this._loading$
    .asObservable()
    .pipe(map(loadings => !!loadings.length));

  add(): void {
    this._loading$.next([...this._loading$.value, 1]);
  }

  remove(): void {
    const array = this._loading$.value;
    array.pop();
    this._loading$.next(array);
  }
}
