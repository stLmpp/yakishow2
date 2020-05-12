import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'is-what';
import { isKeyof, isNil } from '../../util/util';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform<T>(value: T[], filterBy: keyof T | (keyof T)[], term: any): T[] {
    return filter(value, filterBy, term);
  }
}

export function filter<T>(
  array: T[],
  filterBy: keyof T | (keyof T)[],
  term: any
): T[] {
  if (!array?.length || !filterBy) return array;
  if (!isArray(term)) term = [term].filter(o => !isNil(o));
  if (!term.length) return array;
  if (isKeyof<T>(filterBy)) {
    if (isNil(term)) {
      return array;
    }
    return array.filter(val => term.includes(val[filterBy]));
  } else if (isArray(filterBy)) {
    if (isNil(term)) {
      return array;
    }
    return array.filter(val => filterBy.some(key => term.includes(val[key])));
  } else {
    return array;
  }
}
