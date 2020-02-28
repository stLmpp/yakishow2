import { Pipe, PipeTransform } from '@angular/core';
import { isArray, toLower } from 'lodash';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform<T>(value: T[], keyOrKeys: keyof T | (keyof T)[], term: any): T[] {
    if (!value?.length || !keyOrKeys || !term) {
      return value;
    }
    term = toLower(term)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const keys = isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
    return value.filter(val => {
      return keys.some(key => {
        const valKey = toLower('' + val[key])
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return valKey.includes(term);
      });
    });
  }
}
