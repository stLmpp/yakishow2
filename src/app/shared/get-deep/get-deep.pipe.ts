import { Pipe, PipeTransform } from '@angular/core';
import { getDeep } from '../../util/util';

@Pipe({ name: 'getDeep' })
export class GetDeepPipe implements PipeTransform {
  transform<T = any, R = any>(value: T, key: string | string[]): R {
    return getDeep(value, key);
  }
}
