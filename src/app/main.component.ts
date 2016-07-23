import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MdButton } from '@angular2-material/button/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon } from '@angular2-material/icon/icon';
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
  templateUrl: 'app/main.html'
})

export class AppRouterComponent {
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry;
//            .addSvgIconSetInNamespace('core', 'fonts/core-icon-set.svg')
  }
}
