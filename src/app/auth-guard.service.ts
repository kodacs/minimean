import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): any {
    return this._authService.authLoginGuard()
      .do(function (authed) {
        if (authed) {
          console.log('yes');
        } else {
          console.log('no');
        }
      });
  }

}
