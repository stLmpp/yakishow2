import { EmbeddedViewRef, Injectable, TemplateRef } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {}

  private _snackbar$ = new BehaviorSubject<number>(0);
  snackbar$ = this._snackbar$.asObservable();
  snackbarHeight$ = this.snackbar$.pipe(map(l => (l ? l + 'px' : 0)));

  addSnackbar(snackBar: MatSnackBarRef<any>): void {
    setTimeout(
      () => {
        this._snackbar$.next(
          (snackBar as any)?._overlayRef?._pane?.getBoundingClientRect?.()
            ?.height ?? 0
        );
      },
      this._snackbar$.value > 0 ? 100 : 0
    );
  }

  private removeSnackbar(): void {
    this._snackbar$.next(0);
  }

  private processSnackbar(snackBar: MatSnackBarRef<any>): void {
    this.addSnackbar(snackBar);
    snackBar
      .afterDismissed()
      .pipe(take(1))
      .subscribe(() => {
        this.removeSnackbar();
      });
  }

  open(
    message: string,
    action?: string,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<SimpleSnackBar> {
    const snackBar = this.matSnackBar.open(message, action, config);
    this.processSnackbar(snackBar);
    return snackBar;
  }

  openFromComponent<T>(
    component: ComponentType<T>,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<T> {
    const snackBar = this.matSnackBar.openFromComponent(component, config);
    this.processSnackbar(snackBar);
    return snackBar;
  }

  openFromTemplate(
    template: TemplateRef<any>,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<EmbeddedViewRef<any>> {
    const snackBar = this.matSnackBar.openFromTemplate(template, config);
    this.processSnackbar(snackBar);
    return snackBar;
  }
}
