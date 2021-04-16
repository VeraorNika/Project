import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Я не знаю, зачем это нужно. Вдруг firebase заработает
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
  }
//   
import { AppModule } from './app/app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);