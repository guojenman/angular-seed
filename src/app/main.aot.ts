import './polyfills.imports';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app.module.ngfactory';

if (IS_PRODUCTION) {
  enableProdMode();
}
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

