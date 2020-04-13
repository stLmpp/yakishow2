import { Pipe, PipeTransform } from '@angular/core';
import { isArray, isFunction, isNumber } from 'is-what';
import { getDeep, isNil } from '../../util/util';
import { SortDirection } from '@angular/material/sort';

export type OrderByType<T, K extends keyof T = keyof T> =
  | K[]
  | K
  | string
  | string[]
  | ((valueA: T, valueB: T) => number);

export interface OrderByOptions {
  cancelOrderByOnOrderNull?: boolean;
}

export function orderBy<T, K = keyof T>(
  values: T[],
  keyOrCommand?: OrderByType<T>,
  order: SortDirection = 'asc'
): T[] {
  if (!values?.length) return values;
  if (!order) return values;
  if (!keyOrCommand) {
    return values.sort((valueA, valueB) => compareValues(valueA, valueB));
  } else if (isFunction(keyOrCommand)) {
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
  key: keyof T | string
): number {
  return compareValues(
    getDeep(valueA, key as string),
    getDeep(valueB, key as string)
  );
}

export function compareValuesMultipleKeys<T, K extends keyof T = keyof T>(
  valueA: T,
  valueB: T,
  keys: K[] | string[]
): number {
  let result: number;
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    if (getDeep(valueA, key as string) !== getDeep(valueB, key as string)) {
      result = compareValuesKey<T>(valueA, valueB, key);
      break;
    }
  }
  return result;
}

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform<T, K extends keyof T = keyof T>(
    array: T[],
    keyOrCommand?: OrderByType<T>,
    order: SortDirection = 'asc'
  ): T[] {
    return orderBy(array, keyOrCommand, order);
  }
}
