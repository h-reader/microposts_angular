import { Injectable } from '@angular/core';

/**
 * メッセージ取得サービス
 */
@Injectable()
export class MessageService {

  constructor() { }

  /**
   * メッセージを取得する
   * @param messageKey メッセージキー(MessageKeyクラスのパラメータを利用)
   * @param extStr 置換文字列
   */
  getMessage(messageKey: string, extStr?: any): string {

    var min = extStr && extStr.min ? extStr.min : '';
    var max = extStr && extStr.max ? extStr.max : '';

    var messageList = {
      requied: `値を入力して下さい`,
      email: `正しいメールアドレスを入力してください`,
      minlength: `${min} 文字以上入力してください`,
      maxlength: `${max} 文字以内で入力してください`,
      loginError: `メースアドレス、またはパスワードが違います。`,
    }

    return messageList[messageKey];
  }
}

/**
 * メッセージキー
 */
export class MessageKey {
  static requied: string = 'requied';
  static email: string = 'email';
  static minlength: string = 'minlength';
  static loginError: string = 'loginError';

}
