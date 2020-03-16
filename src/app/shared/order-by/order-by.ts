import { isArray, isFunction, isNumber } from 'is-what';
import { isNil } from '../../util/util';

export type Order = 'asc' | 'desc';

export type OrderByType<T, K extends keyof T = keyof T> =
  | K[]
  | K
  | ((valueA: T, valueB: T) => number);

export function orderBy<T, K = keyof T>(
  values: T[],
  keyOrCommand?: OrderByType<T>,
  order: Order = 'asc'
): T[] {
  if (!values?.length) return values;
  if (!keyOrCommand) return values;
  if (isFunction(keyOrCommand)) {
    return [...values].sort(keyOrCommand);
  } else {
    return [...values].sort((valueA, valueB) => {
      if (order === 'asc') {
        return isArray(keyOrCommand)
          ? compareValuesMultipleKeys(valueA, valueB, keyOrCommand)
          : compareValuesKey(valueA, valueB, keyOrCommand);
      } else {
        return isArray(keyOrCommand)
          ? compareValuesMultipleKeys(valueB, valueA, keyOrCommand)
          : compareValuesKey(valueB, valueA, keyOrCommand);
      }
    });
  }
}

export function compareValues<T>(valueA: T, valueB: T): number {
  if (isNil(valueA)) return 1;
  if (isNil(valueB)) return -1;
  if (isNumber(valueA) && isNumber(valueB)) {
    return +valueA - +valueB;
  } else {
    return valueA.toString().localeCompare(valueB.toString());
  }
}

export function compareValuesKey<T>(
  valueA: T,
  valueB: T,
  key: keyof T
): number {
  return compareValues(valueA?.[key], valueB?.[key]);
}

export function compareValuesMultipleKeys<T, K extends keyof T = keyof T>(
  valueA: T,
  valueB: T,
  keys: K[]
): number {
  let result: number;
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    if (valueA?.[key] !== valueB?.[key]) {
      result = compareValuesKey<T>(valueA, valueB, key);
      break;
    }
  }
  return result;
}
