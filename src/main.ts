import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { RouterConfig, provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent, LoginComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';

import { AppRouterComponent } from './app/';

if (environment.production) {
  enableProdMode();
}

const routes: RouterConfig = [
{ path: '', redirectTo: 'login', terminal: true },
{ path: 'app', component: AppComponent },
{ path: 'login', component: LoginComponent },
{ path: 'contact', redirectTo: 'login' },
];

bootstrap(AppRouterComponent, [
  provideRouter(routes),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  HTTP_PROVIDERS,
  MdIconRegistry
]);

