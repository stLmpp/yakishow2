import { Directive, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from '../../util/util';

@Directive({
  selector: '[mat-fab][floating],[mat-mini-fab][floating]',
})
export class FabFloatingDirective {
  constructor() {}

  @HostBinding('class.mat-button-floating') floating = true;

  private _top: boolean;
  @Input()
  set top(top: '' | boolean) {
    this._top = convertToBoolProperty(top);
  }
  @HostBinding('class.top')
  get topClass(): boolean {
    return this._top;
  }

  private _right: boolean;
  @Input()
  set right(right: '' | boolean) {
    this._right = convertToBoolProperty(right);
  }
  @HostBinding('class.right')
  get rightClass(): boolean {
    return this._right;
  }

  private _bottom = true;
  @Input()
  set bottom(bottom: '' | boolean) {
    this._bottom = convertToBoolProperty(bottom);
  }
  @HostBinding('class.bottom')
  get bottomClass(): boolean {
    return this._bottom;
  }

  private _left: boolean;
  @Input()
  set left(left: '' | boolean) {
    this._left = convertToBoolProperty(left);
  }
  @HostBinding('class.left')
  get leftClass(): boolean {
    return this._left;
  }

  private _center: boolean;
  @Input()
  set center(center: '' | boolean) {
    this._center = convertToBoolProperty(center);
  }
  @HostBinding('class.center')
  get centerClass(): boolean {
    return this._center;
  }
}
