import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class NgLetContext<T> {
  $implicit: T = null;
  ngLet: T = null;

  setData(value: T): void {
    this.$implicit = value;
    this.ngLet = value;
  }
}

@Directive({
  selector: '[ngLet]',
})
export class NgLetDirective<T> implements OnDestroy, OnInit {
  private _context = new NgLetContext<T>();

  constructor(
    private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgLetContext<T>>
  ) {}

  @Input()
  set ngLet(value: T) {
    this._context.setData(value);
  }

  ngOnInit(): void {
    this._viewContainer.clear();
    this._viewContainer.createEmbeddedView(this.templateRef, this._context);
  }

  ngOnDestroy(): void {
    this._viewContainer.clear();
  }
}
