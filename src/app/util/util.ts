import { CompareFn } from '../model/util';
import { TrackByFunction } from '@angular/core';
import { isArray, isNumber, isObject, isString } from 'is-what';

export const compareByFactory = <T = any>(key: keyof T): CompareFn<T> => (
  valueA,
  valueB
) => valueA?.[key] === valueB?.[key];

export const trackByFactory = <T = any>(key?: keyof T): TrackByFunction<T> => (
  index,
  element
) => (key ? element?.[key] ?? index : index);

export function isNil(value: any): value is null | undefined {
  return value == null;
}

export function isKeyof<T = any>(value: any): value is keyof T {
  return isString(value);
}

export function isEmpty(value: any): boolean {
  return (
    (isArray(value) && !value.length) ||
    (isObject(value) && !Object.keys(value).length) ||
    (isString(value) && value === '')
  );
}

export function convertToBoolProperty(val: any): boolean {
  if (isString(val)) {
    val = val.toLowerCase().trim();
    return val === 'true' || val === '';
  }
  return !!val;
}

export type RemoveNullObjectCheckType = 'strict' | 'loose';

export function removeNullObject<T = any>(
  object: T,
  checkType: RemoveNullObjectCheckType = 'strict'
): T {
  if (!object) return object;
  let checkFn: (value: T) => boolean;
  if (checkType === 'loose') {
    checkFn = value => {
      if (isNumber(value)) {
        return value === 0 ? true : !!value;
      } else {
        return !!value;
      }
    };
  } else if (checkType === 'strict') {
    checkFn = value => !isNil(value);
  }
  return Object.entries(object).reduce((obj, [key, value]) => {
    if (checkFn(value)) {
      obj[key] = value;
    }
    return obj;
  }, {}) as T;
}

export function getDeep<T = any, R = any>(obj: T, path: string | string[]): R {
  if (!isArray(path)) path = path.split('.');
  return path.reduce((acc, key) => acc?.[key], obj);
}

export function isAllNull<T = any>(obj: T): boolean {
  return !obj || Object.values(obj).every(o => isNil(o));
}
