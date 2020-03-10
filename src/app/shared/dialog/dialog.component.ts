import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
})
export class DialogComponent implements OnInit {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public matDialogRef: MatDialogRef<DialogComponent>
  ) {
    this.data = {
      buttonCancelar: 'Cancelar',
      buttonConfirmar: 'Confirmar',
      ...this.data,
    };
  }

  ngOnInit(): void {}
}
