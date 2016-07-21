import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, Component } from '@angular/core';
import { RouterConfig, provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent, HomeComponent, environment } from './app/';

@Component({
  selector: 'router-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div>
<nav>
<a>Navigation:</a>
<ul>
<li><a [routerLink]="['home']">Home</a></li>
<li><a [routerLink]="['app']">App</a></li>
</ul>
</nav>
<router-outlet></router-outlet>
</div>
  `
})

class AppRouter {

}

if (environment.production) {
  enableProdMode();
}

const routes: RouterConfig = [
{ path: '', redirectTo: 'app', terminal: true },
{ path: 'app', component: AppComponent },
{ path: 'home', component: HomeComponent },
{ path: 'contact', redirectTo: 'home' },
];



// bootstrap(AppComponent);
bootstrap(AppRouter, [
  provideRouter(routes),
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);

