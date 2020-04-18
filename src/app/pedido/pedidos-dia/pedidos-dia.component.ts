import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PedidoQuery } from '../state/pedido.query';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Observable } from 'rxjs';
import { Pedido } from '../../model/pedido';
import { parse } from 'date-fns';
import { trackByFactory } from '../../util/util';
import {
  LabelValue,
  pedidoStatusArray,
  PedidoStatusEnum,
} from '../../model/pedido-status.enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedidos-dia',
  templateUrl: './pedidos-dia.component.html',
  styleUrls: ['./pedidos-dia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidosDiaComponent implements OnInit {
  constructor(
    public pedidoQuery: PedidoQuery,
    private routerQuery: RouterQuery,
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @ViewChild('filterStatusSettingsRef', { read: TemplateRef })
  filterStatusSettingsRef: TemplateRef<any>;
  filterStatusSettingsDialogRef: MatDialogRef<any>;

  list$: Observable<Pedido[]>;

  filterStatus: PedidoStatusEnum[] = [];
  pedidoStatusList = pedidoStatusArray();

  formSettings = new FormGroup({
    status: new FormControl(this.pedidoStatusList.map(o => o.value)),
    orderBy: new FormControl(),
    sortDirection: new FormControl('asc'),
  });

  trackByPedidoStatus = trackByFactory<LabelValue>('value');
  trackByPedido = trackByFactory<Pedido>('id');

  openFilterModal(): void {
    this.filterStatusSettingsDialogRef = this.matDialog.open(
      this.filterStatusSettingsRef
    );
  }

  applyFiltersAndOrder(): void {
    this.filterStatus = this.formSettings.get('status').value;
    this.filterStatusSettingsDialogRef.close();
    this.changeDetectorRef.markForCheck();
  }

  ngOnInit(): void {
    const dia = this.routerQuery.getQueryParams<string>('dia');
    this.list$ = this.pedidoQuery.selectDayList(
      dia ? parse(dia, 'dd-MM-yyyy', new Date()) : new Date()
    );
  }
}
