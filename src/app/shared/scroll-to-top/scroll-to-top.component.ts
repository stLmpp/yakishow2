import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { WINDOW } from '../../core/window.service';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { sampleTime, takeUntil } from 'rxjs/operators';
import { fadeInOut } from '../animations';
import { RouterQuery } from '@datorama/akita-ng-router-store';

export const scrollToTopDisabled = 'scrollToTopDisabled';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut],
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private routerQuery: RouterQuery
  ) {}

  private _destroy$ = new Subject();

  disabled$ = this.routerQuery.selectData<boolean>(scrollToTopDisabled);

  windowScrolled: boolean;

  scrollToTop(): void {
    const currentScroll =
      this.document.documentElement.scrollTop || this.document.body.scrollTop;
    if (currentScroll > 0) {
      this.window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  ngOnInit(): void {
    const isScrolling = () =>
      (this.window.pageYOffset ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) > 500;
    const isOnTop = () =>
      ((this.windowScrolled && this.window.pageYOffset) ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) < 100;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.window, 'scroll', { passive: true })
        .pipe(takeUntil(this._destroy$), sampleTime(50))
        .subscribe(() => {
          if (isScrolling()) {
            this.windowScrolled = true;
            this.changeDetectorRef.detectChanges();
          }
          if (isOnTop()) {
            this.windowScrolled = false;
            this.changeDetectorRef.detectChanges();
          }
        });
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
