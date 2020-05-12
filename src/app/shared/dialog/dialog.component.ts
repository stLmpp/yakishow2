import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  content: string;
  buttonConfirmar?: string;
  buttonCancelar?: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.data = {
      buttonCancelar: 'Cancelar',
      buttonConfirmar: 'Confirmar',
      ...this.data,
    };
  }

  ngOnInit(): void {}
}
