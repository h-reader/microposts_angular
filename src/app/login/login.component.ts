import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { BaseComponent } from '../base/base.component';
import { ValidationService } from '../common/validation/validation.service';
import { AuthService } from '../common/auth/auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    validService: ValidationService, 
    private authService: AuthService,
    private router: Router) {
    super(validService);
  }

  ngOnInit() {
    this.buildForms();
    super.buildForms();
  }

  buildForms() {
    this.form = this.fb.group( {
      email: [ null, [Validators.required, Validators.email] ],
      password: [ null, [Validators.required, Validators.minLength(8)] ],
    });

    this.setValidateErrorConfig({
      "email": {
        required: { name: "メールアドレス" },
        email: { name: "メールアドレス"},
      },
      "password": {
        required: { name: "パスワード" },
        minlength: { name: "パスワード", min: "8" }
      }
    });
  }


  private login() {

    if(this.form.valid) {

      const body = JSON.stringify({
        'email': this.form.controls.email.value,
        'password': this.form.controls.password.value
      });
      this.authService.logIn(body).then((user: User) => {
        console.log(user);
        this.router.navigate(['/home']);        
      }).catch((res: any) => {
        console.log("エラー");      
      });

    } else {
      console.log('ログインエラー');
    }

  }
}
