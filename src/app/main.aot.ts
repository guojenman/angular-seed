import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleNgFactory } from './app.module.ngfactory';

if (IS_PRODUCTION) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);

