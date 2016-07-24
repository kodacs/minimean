import { Component } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  directives: [MD_BUTTON_DIRECTIVES],
  providers: [AuthService],
  template: `{{title}}
  <button md-raised-button color="primary">this is a magical button</button>
  <h2>auth E and auth O</h2>
<button type="button" (click)="authSrv.resetFirstAdmin()">Admin retesz</button>
<button type="button" (click)="authSrv.mockLogin()">MockLogin</button>
<button type="button" (click)="authSrv.authCheck()">Check</button>
<button type="button" (click)="authSrv.logOut()">Logout</button>
<div *ngIf="loading">loading...</div>
<pre>{{authSrv.data | json}}</pre>
  `
})


export class LoginComponent {
  title = 'login works!';

  constructor(private authSrv: AuthService) {
  }
}
