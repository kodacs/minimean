import { Component, OnInit} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import { FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, UserModel } from './';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  directives: [
    MD_BUTTON_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdCard,
    ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styles: [`
    .content {
      padding: 32px;
      width: 350px;
    }
  `]
})

export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  userModel: UserModel;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(userModel) {
      this._authService.login(userModel.username, userModel.password);
  }

}
