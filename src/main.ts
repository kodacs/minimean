import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, LoginComponent, environment } from './app/';
// import { LoginComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

// bootstrap(AppComponent);
bootstrap(LoginComponent);

