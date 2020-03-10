import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent, DialogData } from './dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  confirm(data: DialogData): MatDialogRef<DialogComponent, boolean> {
    return this.matDialog.open(DialogComponent, { data });
  }
}
