import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { AuthService } from './auth.service';
import { FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  directives: [MD_BUTTON_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
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
<form [formGroup]="registerForm">
  <label>Firstname:</label>
  <input type="text" formControlName="firstname">

  <label>Lastname:</label>
  <input type="text" formControlName="lastname">

  <label>Street:</label>
  <input type="text" formControlName="street">

  <label>Zip:</label>
  <input type="text" formControlName="zip">

  <label>City:</label>
  <input type="text" formControlName="city">

  <button type="submit">Submit</button>
</form>`

// <input type="text" [formControl]="name" />`
})

export class LoginComponent implements OnInit {
  title = 'login works!';

ngOnInit() {
  let registerForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    address: this.formBuilder.group({
      street: [],
      zip: [],
      city: []
    })
  });
}


//  let loginForm = new FormGroup ({
//  loginUser: new FormControl(''),
//  passwordUser: new FormControl('')
//  });

  constructor(private authSrv: AuthService, private formBuilder: FormBuilder) {
  }

}
