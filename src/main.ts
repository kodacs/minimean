import { bootstrap } from '@angular/platform-browser-dynamic'
import { provideRouter } from '@angular/router'
import { enableProdMode } from '@angular/core'
// import { AppComponent, LoginComponent, environment } from './app/'

import { LoginComponent, LoginRoutes, environment } from './app/'

if (environment.production) {
  enableProdMode()
}

// bootstrap(AppComponent);
bootstrap(LoginComponent, [
  provideRouter(LoginRoutes)
]);

