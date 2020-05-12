import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export type SnackBarStatus = 'error' | 'success' | 'warning' | '';

export interface SnackBarData {
  title: string;
  action?: string;
  icon?: string;
  status?: SnackBarStatus;
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent implements OnInit {
  constructor(
    public matSnackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Optional() @Inject(MAT_SNACK_BAR_DATA) data: SnackBarData
  ) {
    this.data = { status: '', ...data };
  }

  data: SnackBarData;

  ngOnInit(): void {}
}
