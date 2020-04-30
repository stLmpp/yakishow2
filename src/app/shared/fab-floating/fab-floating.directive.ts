import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { convertToBoolProperty } from '../../util/util';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[mat-fab][ykFabFloating],[mat-mini-fab][ykFabFloating]',
})
export class FabFloatingDirective implements OnInit, OnDestroy {
  constructor(
    private snackBarService: SnackBarService,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {}

  private _destroy$ = new Subject();

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

  private _bottom: boolean;
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

  offsetXClass: string;
  offsetYClass: string;

  @Input()
  set offsetX(offset: number | string) {
    this._offsetX = offset;
    if (this.offsetXClass) {
      this.renderer2.removeClass(
        this.elementRef.nativeElement,
        this.offsetXClass
      );
    }
    if (offset) {
      this.offsetXClass = `x${offset}`;
      this.renderer2.addClass(this.elementRef.nativeElement, this.offsetXClass);
    }
  }
  private _offsetX: number | string;

  @Input()
  set offsetY(offset: number | string) {
    this._offsetY = offset;
    if (this.offsetYClass) {
      this.renderer2.removeClass(
        this.elementRef.nativeElement,
        this.offsetYClass
      );
    }
    if (offset) {
      this.offsetYClass = `y${offset}`;
      this.renderer2.addClass(this.elementRef.nativeElement, this.offsetYClass);
    }
  }
  private _offsetY: number | string;

  ngOnInit(): void {
    this.snackBarService.snackbarHeight$
      .pipe(takeUntil(this._destroy$))
      .subscribe(height => {
        const marginProperty = this._bottom ? 'bottom' : 'top';
        this.renderer2.setStyle(
          this.elementRef.nativeElement,
          `margin-${marginProperty}`,
          height
        );
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
