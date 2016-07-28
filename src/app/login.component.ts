import { Component, OnInit} from '@angular/core';
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

  <form [formGroup]="myForm" novalidate (ngSubmit)="save(myForm.value, myForm.valid)">
    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" formControlName="name">
      <small [hidden]="myForm.controls.name.valid || (myForm.controls.name.pristine && !submitted)" class="text-danger">
            Name is required (minimum 5 characters).
          </small>
      <!--<pre class="margin-20">{{ myForm.controls.name.errors | json }}</pre>-->
    </div>
    <div class="form-group" formGroupName="address">
      <label for="">Address</label>
      <input type="text" class="form-control" formControlName="street">
      <small [hidden]="myForm.controls.address.controls.street.valid || (myForm.controls.address.controls.street.pristine && !submitted)" class="text-danger">
            Street required
          </small>
    </div>
    <div class="form-group" formGroupName="address">
      <label for="">Postcode</label>
      <input type="text" class="form-control" formControlName="postcode">
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
    <div class="margin-20">
      <div>myForm details:-</div>
      <pre>Is myForm valid?: <br>{{myForm.valid | json}}</pre>
      <pre>Is myForm submitted?: <br>{{submitted | json}}</pre>
      <pre>myForm value: <br>{{myForm.value | json}}</pre>
    </div>
    <div class="margin-20">
      Form changes:
    </div>
    <div *ngFor="let event of events" class="margin-20">
      <pre> {{ event | json }} </pre>
    </div>
  </form>
`

})

export class LoginComponent implements OnInit {
  title = 'login works!';

  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  ngOnInit() {

 this.myForm = new FormGroup({
        name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
        address: new FormGroup({
            street: new FormControl('', <any>Validators.required),
            postcode: new FormControl('8000')
        })
    });

  }


  constructor(private authSrv: AuthService, private _fb: FormBuilder) {
  }

  save(model: User, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

}

export interface User {
    name: string; // required with minimum 5 chracters
    address?: {
        street?: string; // required
        postcode?: string;
    }
}
