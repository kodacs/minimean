import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { RouterConfig, provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent, LoginComponent, RouterComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { AuthService } from './app';
import { AuthGuard } from './app';
//import { provideForms } from '@angular/forms';


if (environment.production) {
  enableProdMode();
}

const routes: RouterConfig = [
{ path: '', redirectTo: 'login', terminal: true },
{ path: 'app', component: AppComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: 'contact', redirectTo: 'login' },
];

bootstrap(RouterComponent, [
  provideRouter(routes),
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  AuthGuard,
  AuthService,
//  provideForms,
  HTTP_PROVIDERS,
  MdIconRegistry
]);

