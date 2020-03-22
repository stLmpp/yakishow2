import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'is-what';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform<T>(
    value: T[],
    keyOrKeys: keyof T | (keyof T)[],
    term: any,
    reverse = false
  ): T[] {
    if (!value?.length || !keyOrKeys || !term) {
      return value;
    }
    term = ('' + term)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const keys = isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
    return value.filter(val => {
      return keys.some(key => {
        const valKey = ('' + val[key])
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return reverse ? !valKey.includes(term) : valKey.includes(term);
      });
    });
  }
}
