import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseComponent } from '../base/base.component';
import { AuthService } from '../common/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** ログインの失敗字にTrue */
  isLoginError: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoginError = false;
  }

  /**
   * ログイン
   */
  login(values: any) {

    const body = JSON.stringify({
      'email': values.email,
      'password': values.password
    });

    // ログイン処理呼び出し
    this.authService.logIn(body).then((user: User) => {
      console.log(user);
      this.isLoginError = false;
      this.router.navigate(['/home']);
    }).catch((res: any) => {
      this.isLoginError = true;
    });

  }


}
