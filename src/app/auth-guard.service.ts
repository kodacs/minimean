import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService) {}

  canActivate() {
    return this._authService.authLoginGuard();
  }
}
