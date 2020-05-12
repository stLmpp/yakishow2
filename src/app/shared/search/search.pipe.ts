import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'is-what';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform<T = any>(
    value: T[],
    keyOrKeys: keyof T | (keyof T)[],
    term: any,
    reverse = false
  ): T[] {
    return search(value, keyOrKeys, term, reverse);
  }
}

export function search<T = any>(
  array: T[],
  keyOrKeys: keyof T | (keyof T)[],
  term: any,
  reverse = false
): T[] {
  if (!array?.length || !keyOrKeys || !term) {
    return array;
  }
  term = ('' + term)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const keys = isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
  return array.filter(val => {
    return keys.some(key => {
      const valKey = ('' + val[key])
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return reverse ? !valKey.includes(term) : valKey.includes(term);
    });
  });
}
