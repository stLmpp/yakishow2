import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class YkLetContext<T> {
  $implicit: T = null;
  ykLet: T = null;

  setData(value: T): void {
    this.$implicit = value;
    this.ykLet = value;
  }
}

@Directive({ selector: '[ykLet]' })
export class LetDirective<T> implements OnDestroy, OnInit {
  private _context = new YkLetContext<T>();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<YkLetContext<T>>
  ) {}

  static ngTemplateContextGuard<T>(
    dir: LetDirective<T>,
    ctx: any
  ): ctx is YkLetContext<NonNullable<T>> {
    return true;
  }

  @Input()
  set ykLet(value: T) {
    this._context.setData(value);
  }

  ngOnInit(): void {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, this._context);
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }
}
