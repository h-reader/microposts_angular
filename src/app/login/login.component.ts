import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseComponent } from '../base/base.component';
import { AuthService } from '../common/auth/auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  form;
  formErrors: {};
  isLoginError: boolean;

  constructor(private fb: FormBuilder,
    private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.buildForms();
    super.buildForms();
    this.isLoginError = false;
  }

  buildForms() {
    this.form = this.fb.group( {
      email: [ null, [Validators.required, Validators.email] ],
      password: [ null, [Validators.required, Validators.minLength(8)] ],
    });

    this.setValidateErrorConfig({
      'email': {
        required: {},
        email: {},
      },
      'password': {
        required: {},
        minlength: { min: '8' }
      }
    });
  }

  /**
   * ログイン
   */
  login() {

    if (this.form.valid) {

      const body = JSON.stringify({
        'email': this.form.controls.email.value,
        'password': this.form.controls.password.value
      });
      this.authService.logIn(body).then((user: User) => {
        console.log(user);
        this.isLoginError = false;
        this.routerNavigate(['/home']);
      }).catch((res: any) => {
        this.isLoginError = true;
        console.log('エラー');
      });

    }

  }
  

}
