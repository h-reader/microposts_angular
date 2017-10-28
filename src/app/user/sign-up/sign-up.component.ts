import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../common/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupErrorMessage: string;

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {

  }

  async entry(values: any) {

    const body = JSON.stringify({
      'email': values.email,
      'password': values.password,
      'name': values.name,
    });

    try {
      const user = await this.service.signup(body);

      console.log(user);
      this.signupErrorMessage = null;
      this.router.navigate(['/home']);

    } catch (e) {
      console.error(e);
      this.signupErrorMessage = '失敗';
    }

  }


  private validate(values: any) {

    if (values.password !== values.password_confirm) {

      // TODO: メッセージ
    }

  }


}
