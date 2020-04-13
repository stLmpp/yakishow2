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
export class YkFabFloatingDirective implements OnInit, OnDestroy {
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

  ngOnInit(): void {
    this.snackBarService.snackbarHeight$
      .pipe(takeUntil(this._destroy$))
      .subscribe(h => {
        const marginProperty = this._bottom ? 'bottom' : 'top';
        this.renderer2.setStyle(
          this.elementRef.nativeElement,
          `margin-${marginProperty}`,
          h
        );
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
