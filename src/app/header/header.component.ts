import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LoadingService } from '../core/loading/loading.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SidenavService } from '../sidenav/sidenav.service';
import { AuthQuery } from '../auth/state/auth.query';
import { AuthService } from '../auth/state/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { DOCUMENT } from '@angular/common';
import { ThemesEnum } from '../model/themes.enum';
import { Observable, Subject } from 'rxjs';
import { UpdateResult } from '../model/update-result';
import { DialogService } from '../shared/dialog/dialog.service';
import { filter, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    public loadingService: LoadingService,
    public sidenavService: SidenavService,
    public authQuery: AuthQuery,
    public authService: AuthService,
    private matDialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
    private dialogService: DialogService
  ) {}

  private _destroy$ = new Subject();

  themesEnum = ThemesEnum;

  onLogin(): void {
    this.matDialog.open(LoginComponent);
  }

  changeTheme(theme: ThemesEnum): void {
    let http: Observable<UpdateResult>;
    if (theme === ThemesEnum.light) {
      http = this.authService.updateTheme(
        this.authQuery.getUserSnapshot().id,
        ThemesEnum.dark
      );
    } else {
      http = this.authService.updateTheme(
        this.authQuery.getUserSnapshot().id,
        ThemesEnum.light
      );
    }
    http.subscribe();
  }

  logout(): void {
    this.dialogService
      .confirm({
        content: 'Tem certeza?',
        buttonCancelar: 'Não',
        buttonConfirmar: 'Sim',
      })
      .afterClosed()
      .pipe(take(1), takeUntil(this._destroy$), filter(Boolean))
      .subscribe(() => {
        this.authService.logout();
      });
  }

  ngOnInit(): void {
    this.authQuery.themeChanged$
      .pipe(takeUntil(this._destroy$))
      .subscribe(theme => {
        if (theme === ThemesEnum.light) {
          this.renderer2.removeClass(this.document.body, 'dark-theme');
        } else {
          this.renderer2.addClass(this.document.body, 'dark-theme');
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
