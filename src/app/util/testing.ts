import { ValueProvider } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';

export const matDialogRefProvider: ValueProvider = {
  provide: MatDialogRef,
  useValue: {},
};

export const matExpansionPanelProvider: ValueProvider = {
  provide: MatExpansionPanel,
  useValue: {},
};
