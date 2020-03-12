import { cacheable, setLoading, Store } from '@datorama/akita';
import { Observable } from 'rxjs';

export function cacheableCustom<T>(
  store: Store,
  $request: Observable<T>,
  options: { emitNext: boolean } = { emitNext: true }
): Observable<T> {
  return cacheable(store, $request, options).pipe(setLoading(store));
}
