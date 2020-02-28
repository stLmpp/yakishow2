import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControl][disabledControl],[formControlName][disabledControl]',
})
export class DisabledControlDirective implements OnInit {
  constructor(private ngControl: NgControl) {}

  markToDisable: boolean;

  @Input()
  set disabledControl(disabled: boolean) {
    this.markToDisable = disabled;
    this.ngControl.control?.[disabled ? 'disable' : 'enable']({
      emitEvent: false,
      onlySelf: true,
    });
  }

  ngOnInit(): void {
    if (this.markToDisable) {
      this.ngControl.control.disable({ onlySelf: true, emitEvent: false });
    }
  }
}
