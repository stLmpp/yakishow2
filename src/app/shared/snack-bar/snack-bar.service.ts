import { EmbeddedViewRef, Injectable, TemplateRef } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';

export interface SnackBarEntity {
  [id: number]: MatSnackBarRef<any>;
}

let ID = 0;

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {}

  private _snackbar$ = new BehaviorSubject<SnackBarEntity>({});
  snackbar$ = this._snackbar$.asObservable();
  snackbarList$: Observable<MatSnackBar[]> = this.snackbar$.pipe(
    map(Object.values)
  );
  snackbarHeight$ = this.snackbarList$.pipe(
    pluck('length'),
    map(l => l * 64),
    map(l => (l ? l + 'px' : 0))
  );

  private addSnackbar(snackBar: MatSnackBarRef<any>): number {
    const id = ID++;
    this._snackbar$.next({ ...this._snackbar$.value, [id]: snackBar });
    return id;
  }

  private removeSnackbar(id: number): void {
    const newState = Object.entries({ ...this._snackbar$.value }).reduce(
      (acc: SnackBarEntity, [idSnack, snackbar]) => {
        if (+idSnack !== id) {
          acc = { ...acc, [idSnack]: snackbar };
        }
        return acc;
      },
      {}
    );
    this._snackbar$.next(newState);
  }

  private processSnackbar(snackBar: MatSnackBarRef<any>): void {
    const id = this.addSnackbar(snackBar);
    snackBar
      .afterDismissed()
      .pipe(take(1))
      .subscribe(() => this.removeSnackbar(id));
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
