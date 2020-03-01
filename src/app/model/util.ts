import { ID } from '@datorama/akita';

export type CompareFn<T = any> = (valueA: T, valueB: T) => boolean;
export interface HasID {
  id: ID;
}
