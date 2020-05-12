import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { LabelValue, trackByValue } from '../../../model/label-value';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-menu-order-by',
  templateUrl: './menu-order-by.component.html',
  styleUrls: ['./menu-order-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuOrderByComponent),
      multi: true,
    },
  ],
})
export class MenuOrderByComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  trackByValue = trackByValue;

  @Input() items: LabelValue<string>[];

  @Input() selected: string;
  @Output() selectedChange = new EventEmitter<string>();

  emitOnChange(value: string): void {
    this.selected = value;
    this.selectedChange.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  onChange: (value: string) => any = () => {};
  onTouched: () => any = () => {};

  registerOnChange(fn: (value: string) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  writeValue(obj: string): void {
    this.selected = obj;
  }

  ngOnInit(): void {}
}
