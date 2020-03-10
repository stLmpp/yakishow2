import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import {
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
  Provider,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { HammerConfig } from './core/hammer-config.service';
import { WINDOW_PROVIDERS } from './core/window.service';
import { LoadingInterceptor } from './core/loading/loading.interceptor';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { DateInterceptor } from './core/date.interceptor';
import { ApiInterceptor } from './core/api.interceptor';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { registerLocaleData } from '@angular/common';
import localePtBR from '@angular/common/locales/pt';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormatErrorInterceptor } from './core/error/format-error.interceptor';
import { NAVIGATOR } from './core/navigator.token';

registerLocaleData(localePtBR, 'pt-BR');

const withInterceptors = (...interceptors: any[]): Provider[] =>
  interceptors.map(useClass => ({
    provide: HTTP_INTERCEPTORS,
    useClass,
    multi: true,
  }));

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot({
      prefix: '',
      align: 'left',
      allowNegative: true,
      decimal: ',',
      precision: 2,
      suffix: '',
      thousands: '.',
      nullable: false,
      allowZero: true,
    }),
    SharedModule,
    CoreModule,
    AuthModule,
  ],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
