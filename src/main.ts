import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, Component, ViewEncapsulation } from '@angular/core';
import { RouterConfig, provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent, HomeComponent, environment } from './app/';
import { MdButton } from '@angular2-material/button/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon } from '@angular2-material/icon/icon';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';


@Component({
  selector: 'router-app',
  directives: [
    ROUTER_DIRECTIVES,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdToolbar,
    MdIcon
    ],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [MdIconRegistry],
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
      <button md-icon-button (click)="start.open()">
        <md-icon class="md-24" >menu</md-icon>
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

export class AppRouterComponent {
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry;
//            .addSvgIconSetInNamespace('core', 'fonts/core-icon-set.svg')
  }
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
bootstrap(AppRouterComponent, [
  provideRouter(routes),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  HTTP_PROVIDERS,
  MdIconRegistry
]);

