import { Component, OnInit} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { AuthService } from './auth.service';
import { FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  directives: [MD_BUTTON_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [AuthService],
  templateUrl: './login.component.html'

})

export class LoginComponent implements OnInit {
  title = 'login works!';

  public loginForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  ngOnInit() {

 this.loginForm = new FormGroup({
        username: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
        password: new FormControl('')
    });

  }


  constructor(private authSrv: AuthService, private _fb: FormBuilder) {
  }

  save(model: User, isValid: boolean) {
        this.submitted = true; // set form submit to true
        this.authSrv.userLogin(model.username, model.password);
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

}

export interface User {
    username: string; // required with minimum 5 chracters
    password: string;
}
