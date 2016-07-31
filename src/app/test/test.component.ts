import { Component, OnInit} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdCard, MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';

import { AuthService, UserModel } from '../';

@Component({
  moduleId: module.id,
  selector: 'test-component',
  directives: [
    MD_BUTTON_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdCard,
    MdToolbar
    ],
  providers: [AuthService],
  templateUrl: './test.component.html',
  styles: [`
    .content {
      padding: 32px;
      width: 50%;
    }
  `]

})

export class TestComponent implements OnInit {

  public loginForm2: FormGroup;

  userModel: UserModel;
  ngOnInit() {
    this.loginForm2 = new FormGroup({
      username: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      password: new FormControl('')
    });
  }

  constructor(private _authService: AuthService, private _fb: FormBuilder) {
  }

  login(userModel, isValid: boolean) {
    if (isValid) {
      this._authService.userLogin(userModel.username, userModel.password);
    } else {
      console.log('invalid!');
    }
  }
}
