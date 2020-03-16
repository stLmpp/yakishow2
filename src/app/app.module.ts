import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { registerLocaleData } from '@angular/common';
import localePtBR from '@angular/common/locales/pt';
import { NgxCurrencyModule } from 'ngx-currency';

registerLocaleData(localePtBR, 'pt-BR');

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
    SharedModule.forRoot(),
    CoreModule.forRoot(),
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
