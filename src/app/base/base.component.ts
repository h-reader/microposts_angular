import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from '../common/auth/auth.service';
import { ValidationService } from '../common/validation/validation.service';
import { ServiceLocator } from '../common/service-locator';

/**
 * バリデーション時のエラーメッセージ情報
 * [key: string → フィールド名]: {
 *   [key: string → バリデーションキー] :
 *     { [key: string → メッセージキー]: string → エラーメッセージ }
 * }
 */
interface ValidateErrorConfig {
  [key: string]: {
    [key: string]: { [key: string]: string }
  };
}

/**
 * コンポーネントのベースクラス
 */
export abstract class BaseComponent {

  form: FormGroup;
  errorConfig: ValidateErrorConfig;
  formErrors: {};
  private _authService: AuthService;
  private _validationService: ValidationService
  private _router: Router;

  constructor() { 
    this._authService = ServiceLocator.injector.get(AuthService);
    this._validationService = ServiceLocator.injector.get(ValidationService);
    this._router = ServiceLocator.injector.get(Router);
  }

  /**
   * フォームグループオブジェクトを生成する
   */
  buildForms() {
    this.form.valueChanges.subscribe(data => {
      this.onValueChange(data);
    });

    this.validate();
  }

  /**
   * フォームオブジェクトの変更時の処理。
   * フォームのバリデートを行う。
   * @param data 変更データ
   */
  onValueChange(data?: any) {
    this.validate();
  }

  /**
   * フォームオブジェクトのバリデート処理s
   */
  validate() {
    this.formErrors = {};

    for (const field in this.form.controls) {
      if (this.form.controls.hasOwnProperty(field)) {

        const control = this.form.get(field);
        this.formErrors[field] = '';
        if (control && control.dirty && !control.valid) {
            for (const key in control.errors) {

              if (this.formErrors[field] === '') {
                this.formErrors[field] +=
                this._validationService.getValidatorErrorMessage(key, this.errorConfig[field][key]);
              }
            }
            this.emitErrorAction(field);

        }
        this.emitNotErrorAction(field);

      }
    }
  }

  /**
   * AngularRouterによる画面遷移を行う
   * @param commands 遷移先
   * @param exstras 
   */
  routerNavigate(commands: any[], exstras?: NavigationExtras): Promise<boolean> {
    return this._router.navigate(['/home']);
  }

  /**
   * バリデーションエラー情報を設定します
   * @param config バリデーションエラー情報
   */
  setValidateErrorConfig(config: ValidateErrorConfig) {
    this.errorConfig = config;
  }

  emitErrorAction(field: any) {
    /* エラー発生時処理、継承先で実装 */
  }

  emitNotErrorAction(field: any) {
    /* エラー未発生時処理、継承先で実装 */
  }

}
