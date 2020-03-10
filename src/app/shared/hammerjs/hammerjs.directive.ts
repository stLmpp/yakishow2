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
  form,
  mat-expansion-panel`,
})
export class HammerjsDirective {
  constructor() {}

  @Output() swipe = new EventEmitter<TouchInput>();
  @Output() swipeleft = new EventEmitter<TouchInput>();
  @Output() swiperight = new EventEmitter<TouchInput>();
  @Output() swipeup = new EventEmitter<TouchInput>();
  @Output() swipedown = new EventEmitter<TouchInput>();
  @Output() pan = new EventEmitter<TouchInput>();
  @Output() panstart = new EventEmitter<TouchInput>();
  @Output() panmove = new EventEmitter<TouchInput>();
  @Output() panend = new EventEmitter<TouchInput>();
  @Output() pancancel = new EventEmitter<TouchInput>();
  @Output() panleft = new EventEmitter<TouchInput>();
  @Output() panright = new EventEmitter<TouchInput>();
  @Output() panup = new EventEmitter<TouchInput>();
  @Output() pandown = new EventEmitter<TouchInput>();
  @Output() pinch = new EventEmitter<TouchInput>();
  @Output() pinchstart = new EventEmitter<TouchInput>();
  @Output() pinchmove = new EventEmitter<TouchInput>();
  @Output() pinchend = new EventEmitter<TouchInput>();
  @Output() pinchcancel = new EventEmitter<TouchInput>();
  @Output() pinchin = new EventEmitter<TouchInput>();
  @Output() pinchout = new EventEmitter<TouchInput>();
  @Output() press = new EventEmitter<TouchInput>();
  @Output() pressup = new EventEmitter<TouchInput>();
  @Output() rotate = new EventEmitter<TouchInput>();
  @Output() rotatestart = new EventEmitter<TouchInput>();
  @Output() rotatemove = new EventEmitter<TouchInput>();
  @Output() rotateend = new EventEmitter<TouchInput>();
  @Output() rotatecancel = new EventEmitter<TouchInput>();
  @Output() tap = new EventEmitter<TouchInput>();
}
