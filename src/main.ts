import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { RouterConfig, provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent, LoginComponent, RouterComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';

if (environment.production) {
  enableProdMode();
}

const routes: RouterConfig = [
{ path: '', redirectTo: 'login', terminal: true },
{ path: 'app', component: AppComponent },
{ path: 'login', component: LoginComponent },
{ path: 'contact', redirectTo: 'login' },
];

bootstrap(RouterComponent, [
  provideRouter(routes),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  HTTP_PROVIDERS,
  MdIconRegistry
]);

