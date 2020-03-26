import { NativeDateAdapter } from '@angular/material/core';
import { format } from 'date-fns';

export class NativeDateFormatAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: any): string {
    return format(date, 'yyyy-MM-dd');
  }
}
