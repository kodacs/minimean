import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { RouterConfig, provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { disableDeprecatedForms, provideForms } from '@angular/forms';


import {
  AppComponent,
  LoginComponent,
  RouterComponent,
  TestComponent,
  environment,
  AuthService,
  AuthGuard,
} from './app/';

if (environment.production) {
  enableProdMode();
}

const routes: RouterConfig = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'app', component: AppComponent, canActivate: [AuthGuard] },
{ path: 'test', component: TestComponent },
];

bootstrap(RouterComponent, [
  provideRouter(routes),
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  AuthGuard,
  AuthService,
  provideForms(),
  disableDeprecatedForms(),
  HTTP_PROVIDERS,
  MdIconRegistry
]);

