import { CompareFn } from '../model/util';
import { TrackByFunction } from '@angular/core';

export const compareByFactory = <T = any>(key: keyof T): CompareFn<T> => (
  valueA,
  valueB
) => valueA?.[key] === valueB?.[key];

export const trackByFactory = <T = any>(key: keyof T): TrackByFunction<T> => (
  _,
  element
) => element[key];

export function isNil(value: any): value is null | undefined {
  return value == null;
}
