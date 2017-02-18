import './polyfills.imports';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

if (IS_PRODUCTION) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);

