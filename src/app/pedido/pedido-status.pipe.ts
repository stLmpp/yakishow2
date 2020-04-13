import { Pipe, PipeTransform } from '@angular/core';
import {
  pedidoStatusArray,
  PedidoStatusEnum,
} from '../model/pedido-status.enum';

export function transformPedidoStatus(value: PedidoStatusEnum): string {
  return pedidoStatusArray().find(o => o.value === value).label;
}

@Pipe({ name: 'pedidoStatus' })
export class PedidoStatusPipe implements PipeTransform {
  transform(value: PedidoStatusEnum): string {
    return transformPedidoStatus(value);
  }
}
