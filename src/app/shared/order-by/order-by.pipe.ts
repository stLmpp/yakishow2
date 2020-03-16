import { Pipe, PipeTransform } from '@angular/core';
import { Order, orderBy } from './order-by';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform<T, K extends keyof T = keyof T>(
    array: T[],
    keyOrCommand?: K[] | K | ((valueA: T, valueB: T) => number),
    order: Order = 'asc'
  ): T[] {
    return orderBy(array, keyOrCommand, order);
  }
}
