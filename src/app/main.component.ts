import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, NavigationStart } from '@angular/router';
import { MdButton } from '@angular2-material/button/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon } from '@angular2-material/icon/icon';

import { AuthService } from './';

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
  providers: [AuthService],
  templateUrl: 'app/main.component.html'
})

export class RouterComponent {

  constructor(private _authService: AuthService, private _router: Router ) {
    _router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event) => {
        _authService.authUpdate();
      });
  }

}
