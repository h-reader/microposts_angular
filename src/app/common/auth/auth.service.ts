import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import { User } from '../../user/user';
import { HttpBase } from '../../base/http-base';


@Injectable()
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: Http) {}

      /**
   * ローカルストレージに保存してあるtoken情報を取得する
   */
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access-token');
    } else {
      return null;
    }
  }

  /**
   * ローカルストレージに保存してあるuid情報を取得する
   */
  getUid() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('uid')) {
      return localStorage.getItem('uid');
    } else {
      return null;
    }
  }

  /**
   * ローカルストレージに保存してあるclient情報を取得する
   */
  getClient() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('client');
    } else {
      return null;
    }
  }

  /**
   * アクセストークンをローカルストレージに保存
   * @param token アクセストークン
   */
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId) && token) {
      localStorage.setItem('access-token', token);
      console.log(this.getToken());
    }
  }

  /**
   * uid = email 情報をローカルストレージに保存
   * @param uid UID
   */
  setUid(uid: string) {
    if (isPlatformBrowser(this.platformId) && uid) {
      localStorage.setItem('uid', uid);
      console.log(this.getUid());
    }
  }

  /**
   * client = 使用端末情報をローカルストレージに保存
   * @param client 使用端末情報
   */
  setClient(client: string) {
    if (isPlatformBrowser(this.platformId) && client) {
      localStorage.setItem('client', client);
      console.log(this.getClient());
    }
  }

  /**
   * ログインしているかどうか
   */
  isLogin(): boolean {
    return this.getToken() != null && this.getUid() != null && this.getClient() != null;
  }

  /**
   * ログインする
   * @param body ログイン情報（メールアドレス、パスワード）
   */
  logIn(body: any): Promise<User> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(environment.API_URL + '/auth/sign_in', body, options)
    .toPromise().then(response => {
      console.log('status: ' + response.status);
      console.log('response : ↓');
      console.log(response);
      
      // 認証情報を保存
      this.setToken(response.headers.get('access-token'));
      this.setUid(response.headers.get('uid'));
      this.setClient(response.headers.get('client'));
      // ユーザ情報を返却
      return response.json().data as User;
    })
    .catch(this.handleError);
  }

  /**
   * ログアウトする
   */
  logout() {
    this.setToken(null);
    this.setUid(null);
    this.setClient(null);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
