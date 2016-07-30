import { Component, OnInit} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { AuthService } from './auth.service';
import { FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  directives: [
    MD_BUTTON_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdCard,
    MdToolbar
    ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styles: [`
    .content {
      padding: 32px;
      width: 50%;
    }
  `]

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
