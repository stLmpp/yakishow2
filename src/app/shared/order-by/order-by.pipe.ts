import { Pipe, PipeTransform } from '@angular/core';
import { Order, orderBy, OrderByType } from './order-by';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform<T>(
    array: T[],
    keyOrCommand?: OrderByType<T>,
    order: Order = 'asc'
  ): T[] {
    return orderBy(array, keyOrCommand, order);
  }
}
