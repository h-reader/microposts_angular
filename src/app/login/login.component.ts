import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseComponent } from '../base/base.component';
import { ValidationService } from '../common/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private fb: FormBuilder, service: ValidationService) {
    super(service);
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
  }

  emitErrorAction(field: any) {
    /* エラー発生時処理、継承先で実装 */
    console.log('aa');
    console.log(this.formErrors);
  }


  private login() {
    
    //this.validControlError('email');
/*
    if(this.form.controls.email.errors) {
      console.log(this.form.controls.email.errors);
      console.log(this.form.controls.email.errors[0]);
      console.log(this.form.controls.email.validator);
    }

    alert(this.form.status);
    console.log(this.form);
    */
  }
}
