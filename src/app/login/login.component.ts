import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
    this.createForm();
  }

  ngOnInit() {

  }

  private createForm() {
    this.form = this.fb.group( {
      email: [ null, [Validators.required, Validators.email] ],
      password: [ null, [Validators.required, Validators.minLength(8)] ],
    });

    this.validation = {
      email: {
        required: "メールアドレスを入力してください",
        email: "メールアドレスが正しく入力されていません"
      }, 
      password: {
        required: "パスワードを入力してください",
        minLength: "パスワードは８文字以上入力してください"
      }
    };
  }

  private login() {
    
    if(this.form.controls.email.errors) {
      console.log(this.form.controls.email.errors);
      console.log(this.form.controls.email.errors[0]);
      console.log(this.form.controls.email.validator);
    }

    alert(this.form.status);
    console.log(this.form);
  }
}
