import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ComponentService {

  constructor(private authService: AuthService, private router: Router) { }


  /**
   * 認証チェックを行い、認証されていない場合はログイン画面に遷移する
   */
  componentAuthCheck() {

    // 認証できていない場合、ログイン画面に遷移
    if (!this.authService.isLogin()) {
      this.router.navigate(['/login']);
    }
  }

}
