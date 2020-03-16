import { isFunction, isNumber } from 'is-what';
import { isNil } from '../../util/util';

export type Order = 'asc' | 'desc';
export type OrderByType<T> = keyof T | ((valueA: T, valueB: T) => number);

export function orderBy<T>(
  values: T[],
  keyOrCommand?: OrderByType<T>,
  order: Order = 'asc'
): T[] {
  if (!values?.length) return values;
  if (!keyOrCommand) return values.sort();
  if (isFunction(keyOrCommand)) {
    return values.sort(keyOrCommand);
  } else {
    return values.sort((valueA, valueB) => {
      if (order === 'asc') {
        return compareValues(valueA, valueB, keyOrCommand);
      } else {
        return compareValues(valueB, valueA, keyOrCommand);
      }
    });
  }
}

function compareValues<T>(valueA: T, valueB: T, key: keyof T): number {
  if (isNil(valueA?.[key]) || isNil(valueB?.[key])) return;
  if (isNumber(valueA[key]) && isNumber(valueB[key])) {
    return +valueA[key] - +valueB[key];
  } else {
    return valueA[key].toString().localeCompare(valueB[key].toString());
  }
}
