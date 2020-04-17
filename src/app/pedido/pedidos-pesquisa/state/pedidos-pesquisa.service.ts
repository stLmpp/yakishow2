import { Injectable } from '@angular/core';
import { PedidosPesquisaStore } from './pedidos-pesquisa.store';
import { PedidosPesquisaForm } from './pedidos-pesquisa.model';

@Injectable({ providedIn: 'root' })
export class PedidosPesquisaService {
  constructor(private pedidosPesquisaStore: PedidosPesquisaStore) {}

  private timeout: any;

  resetFormInTimeout(time = 900000): void {
    this.timeout = setTimeout(() => {
      this.pedidosPesquisaStore.update({ form: null });
    }, time);
  }

  stopTimeoutResetForm(): void {
    clearTimeout(this.timeout);
  }

  updateForm(form: PedidosPesquisaForm): void {
    this.pedidosPesquisaStore.update({ form });
  }
}
