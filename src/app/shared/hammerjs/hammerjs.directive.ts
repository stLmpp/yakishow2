import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: `
  button,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  label,
  li,
  nav,
  ol,
  p,
  select,
  span,
  strong,
  table,
  td,
  th,
  tr,
  ul,
  form`,
})
export class HammerjsDirective {
  constructor() {}

  @Output() swipe = new EventEmitter();
  @Output() swipeleft = new EventEmitter();
  @Output() swiperight = new EventEmitter();
  @Output() swipeup = new EventEmitter();
  @Output() swipedown = new EventEmitter();
  @Output() pan = new EventEmitter();
  @Output() panstart = new EventEmitter();
  @Output() panmove = new EventEmitter();
  @Output() panend = new EventEmitter();
  @Output() pancancel = new EventEmitter();
  @Output() panleft = new EventEmitter();
  @Output() panright = new EventEmitter();
  @Output() panup = new EventEmitter();
  @Output() pandown = new EventEmitter();
  @Output() pinch = new EventEmitter();
  @Output() pinchstart = new EventEmitter();
  @Output() pinchmove = new EventEmitter();
  @Output() pinchend = new EventEmitter();
  @Output() pinchcancel = new EventEmitter();
  @Output() pinchin = new EventEmitter();
  @Output() pinchout = new EventEmitter();
  @Output() press = new EventEmitter();
  @Output() pressup = new EventEmitter();
  @Output() rotate = new EventEmitter();
  @Output() rotatestart = new EventEmitter();
  @Output() rotatemove = new EventEmitter();
  @Output() rotateend = new EventEmitter();
  @Output() rotatecancel = new EventEmitter();
  @Output() tap = new EventEmitter();
}
