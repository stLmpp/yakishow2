import { AfterViewInit, Directive, Host, Input, Optional } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { isUndefined } from 'is-what';

@Directive({
  selector:
    '[formControl][ykDisabledControl],[formControlName][ykDisabledControl],[formGroup][ykDisabledControl],[formGroupName][ykDisabledControl],[formArray][ykDisabledControl],[formArrayName][ykDisabledControl]',
})
export class YkDisabledControlDirective implements AfterViewInit {
  constructor(
    @Optional() @Host() ngControl: NgControl,
    @Optional() @Host() controlContainer: ControlContainer
  ) {
    this.ngControl = ngControl ?? controlContainer;
  }

  private _markForLater: boolean;
  private ngControl: NgControl | ControlContainer;

  @Input() emitEvent = false;
  @Input() onlySelf = false;

  @Input()
  set ykDisabledControl(disabled: boolean) {
    const action = disabled ? 'disable' : 'enable';
    if (!this.ngControl?.control?.[action]) {
      this._markForLater = disabled;
    }
    this.ngControl?.control?.[action]?.({
      emitEvent: this.emitEvent,
      onlySelf: this.onlySelf,
    });
  }

  ngAfterViewInit(): void {
    if (!isUndefined(this._markForLater)) {
      setTimeout(() => {
        this.ykDisabledControl = this._markForLater;
      });
    }
  }
}
