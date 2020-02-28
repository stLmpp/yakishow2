import { cacheable, Store } from '@datorama/akita';
import { Observable } from 'rxjs';

export function cacheableCustom<T>(
  store: Store,
  $request: Observable<T>
): Observable<T> {
  store.setLoading(false);
  return cacheable(store, $request);
}
