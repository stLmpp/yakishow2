import {
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { HammerConfig } from './hammer-config.service';
import { WINDOW_PROVIDERS } from './window.service';
import { ApiInterceptor } from './api.interceptor';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { DateInterceptor } from './date.interceptor';
import { FormatErrorInterceptor } from './error/format-error.interceptor';
import { NAVIGATOR } from './navigator.token';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
import {
  DEFAULT_PIPE_TYPE,
  DefaultPipeType,
} from '../shared/default/default.pipe';

const withInterceptors = (...interceptors: any[]): Provider[] =>
  interceptors.map(useClass => ({
    provide: HTTP_INTERCEPTORS,
    useClass,
    multi: true,
  }));

const MODULES = [HammerModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: LOCALE_ID,
          useValue: 'pt-BR',
        },
        {
          provide: HAMMER_GESTURE_CONFIG,
          useClass: HammerConfig,
        },
        ...WINDOW_PROVIDERS,
        ...withInterceptors(
          ApiInterceptor,
          AuthInterceptor,
          LoadingInterceptor,
          DateInterceptor,
          FormatErrorInterceptor
        ),
        {
          provide: DEFAULT_CURRENCY_CODE,
          useValue: 'BRL',
        },
        {
          provide: NAVIGATOR,
          useValue: navigator,
        },
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: {
            duration: 5000,
          } as MatSnackBarConfig,
        },
        {
          provide: DEFAULT_PIPE_TYPE,
          useValue: 'strict' as DefaultPipeType,
        },
      ],
    };
  }
}
