import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogOptions {
  title?: string;
  content?: string;
  yesBtn?: string;
  noBtn?: string;
}

export const DEFAULTS: ConfirmDialogOptions = {
  noBtn: 'Não',
  yesBtn: 'Sim',
};

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogOptions
  ) {
    this.data = { ...DEFAULTS, ...this.data };
  }

  ngOnInit(): void {}
}
