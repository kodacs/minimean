import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, Component } from '@angular/core';
import { RouterConfig, provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent, HomeComponent, environment } from './app/';
import {MdButton} from '@angular2-material/button/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

@Component({
  selector: 'router-app',
  directives: [
    ROUTER_DIRECTIVES,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdToolbar
    ],
  template: `

<md-sidenav-layout fullscreen>
  <md-sidenav #start>
    <md-nav-list>
      <a md-list-item [routerLink]="['home']">Button</a>
      <a md-list-item [routerLink]="['app']">Button Toggle</a>
    </md-nav-list>
    <button md-button (click)="start.close()">CLOSE</button>
  </md-sidenav>
  <div>
    <md-toolbar color="accent">
      <button (click)="start.open()">
        <button class="md-24" >menu</button>
      </button>
      <div>
        <h1> not very sample</h1>
      </div>
    </md-toolbar>

    <div class="demo-content">
      <router-outlet></router-outlet>
    </div>
  </div>
</md-sidenav-layout>



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

