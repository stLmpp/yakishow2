import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { SwipeActionComponent } from './swipe-action.component';
import { Subject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { takeUntil } from 'rxjs/operators';
import { WINDOW } from '../../core/window.service';
import { SwipeActionsService } from './swipe-actions.service';
import { NAVIGATOR } from '../../core/navigator.token';
import { TouchInput } from 'hammerjs';

@Directive({ selector: '[ykSwipeActions]', exportAs: 'ykSwipeActions' })
export class SwipeActionsDirective
  implements OnInit, AfterViewInit, OnDestroy, DoCheck {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(WINDOW) private window: Window,
    private swipeActionsService: SwipeActionsService,
    @Inject(NAVIGATOR) private navigator: Navigator
  ) {}

  @HostBinding('class.swipe-actions') swipeActionsClass = true;

  private _destroy$ = new Subject();
  private componentRef: ComponentRef<SwipeActionComponent>;
  private _rippleActive = false;
  private isOpened = false;

  @Input()
  set swipeDisabled(disabled: boolean) {
    this._disabled = disabled;
    if (disabled) {
      this.translate(0);
    }
  }

  private _disabled: boolean;

  @Input() swipeIcon: string;
  @Input() swipeIconColor: ThemePalette;
  @Input() swipeIconRipple: boolean;
  @Input() updatePositionOnAnyChange: boolean;

  @HostBinding('style.z-index') @Input() zIndex = 1;
  @Output() swiped = new EventEmitter<TouchInput>();
  @Output() swipeClick = new EventEmitter<MouseEvent>();
  @Output() swipeAction = new EventEmitter();

  @HostListener('panstart')
  panStart(): void {
    this.updatePosition();
  }

  @HostListener('panmove', ['$event'])
  pan($event: TouchInput): void {
    if (this._disabled) return;
    this.swipeActionsService.doCheckDisabled = true;
    const x = $event.deltaX - (this.isOpened ? 80 : 0);
    this.hideActions(false);
    if (x >= 1) {
      return;
    }
    if (x <= -80 * 3) {
      if (!this._rippleActive) {
        this.componentRef?.instance.matButton.ripple.launch({ centered: true });
        this.navigator?.vibrate?.(100);
        this._rippleActive = true;
      }
    } else {
      this._rippleActive = false;
    }
    this.translate(x);
  }

  @HostListener('panend', ['$event'])
  panEnd($event: TouchInput): void {
    if (this._disabled) return;
    this.swipeActionsService.doCheckDisabled = false;
    if (this._rippleActive) {
      this.swipeAction.emit();
      this.swiped.emit($event);
      this.close();
      return;
    }
    if ($event.deltaX <= -80) {
      this.open();
    } else {
      this.close();
    }
  }

  private translate(x: number): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'transform',
      `translateX(${x}px)`
    );
  }

  open(): void {
    this.translate(-80);
    this.isOpened = true;
  }

  close(): void {
    this.translate(0);
    this.isOpened = false;
    this.hideActions(true);
  }

  updatePosition(): void {
    if (this.componentRef) {
      const position = this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.height = position.height;
      this.componentRef.instance.top = position.top + this.window.scrollY;
    }
  }

  hideActions(hide: boolean): void {
    if (this.componentRef && this.componentRef.instance.hide !== hide) {
      this.componentRef.instance.hide = hide;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        SwipeActionComponent
      );
      this.componentRef = this.viewContainerRef.createComponent(
        componentFactory
      );
      this.viewContainerRef.insert(this.componentRef.hostView);
      this.componentRef.instance.right = 0;
      this.componentRef.instance.width = 80;
      this.componentRef.instance.icon = this.swipeIcon;
      this.componentRef.instance.hide = true;
      this.componentRef.instance.zIndex = this.zIndex - 1;
      this.componentRef.instance.color = this.swipeIconColor;
      this.componentRef.instance.clicked
        .pipe(takeUntil(this._destroy$))
        .subscribe(event => {
          this.swipeClick.emit(event);
          this.swipeAction.emit();
        });
      this.updatePosition();
    });
    const transition = getComputedStyle(this.elementRef.nativeElement)
      .transition;
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'transition',
      `${transition}, transform 25ms linear`
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngDoCheck(): void {
    if (
      this.updatePositionOnAnyChange &&
      !this.swipeActionsService.doCheckDisabled
    ) {
      this.updatePosition();
    }
  }
}
