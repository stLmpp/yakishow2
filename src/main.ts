import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableAkitaProdMode, persistState } from '@datorama/akita';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

persistState({
  include: ['auth.token'],
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // tslint:disable-next-line:no-console
  .catch(err => console.error(err));
