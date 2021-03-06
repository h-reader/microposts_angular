import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { AuthService } from '../common/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { MessageService, MessageKey } from '../common/message/message.service';

/**
 * ログインコンポーネント
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** ログインエラーメッセージ */
  loginErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
    this.loginErrorMessage = null;
  }

  /**
   * ログイン処理
   */
  async login(values: any) {

    const body = JSON.stringify({
      'email': values.email,
      'password': values.password
    });

    // ログイン処理呼び出し
    try {
      const user = await this.authService.logIn(body);

      console.log(user);
      this.loginErrorMessage = null;
      this.router.navigate(['/home']);

    } catch (e) {
      console.error(e);
      this.loginErrorMessage = this.messageService.getMessage(MessageKey.loginError);
    }

  }

  /**
   * ユーザの新規登録画面へ遷移
   */
  moveSignUp() {
    this.router.navigate(['/sign_up']);
  }

}
