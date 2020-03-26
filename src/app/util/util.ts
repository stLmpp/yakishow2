import { CompareFn } from '../model/util';
import { TrackByFunction } from '@angular/core';
import { isString } from 'is-what';

export const compareByFactory = <T = any>(key: keyof T): CompareFn<T> => (
  valueA,
  valueB
) => valueA?.[key] === valueB?.[key];

export const trackByFactory = <T = any>(key?: keyof T): TrackByFunction<T> => (
  index,
  element
) => (key ? element[key] : index);

export function isNil(value: any): value is null | undefined {
  return value == null;
}

export function isKeyof<T = any>(value: any): value is keyof T {
  return isString(value);
}

export function convertToBoolProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();

    return val === 'true' || val === '';
  }

  return !!val;
}
