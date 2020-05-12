import { Pipe, PipeTransform } from '@angular/core';
import { sumBy } from '../../util/sum/sum';

@Pipe({ name: 'sumBy' })
export class SumByPipe implements PipeTransform {
  transform<T = any>(value: T[], key: keyof T): number {
    if (!value?.length || !key) return 0;
    return sumBy(value, key);
  }
}
