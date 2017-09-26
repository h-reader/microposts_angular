import { FormBuilder, FormGroup } from '@angular/forms';

import { ValidationService } from '../common/validation/validation.service';

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

export abstract class BaseComponent {

  form: FormGroup;
  errorConfig: ValidateErrorConfig;
  formErrors: {};

  constructor(private validService: ValidationService) { }

  buildForms() {
    this.form.valueChanges.subscribe(data => {
      this.onValueChange(data);
    });

    this.onValueChange();
  }

  onValueChange(data?: any) {
    this.formErrors = {}; 

    for(const field in this.form.controls) {
      const control = this.form.get(field);
      this.formErrors[field] = '';
      if (control && control.dirty && !control.valid) {
          for (const key in control.errors){

            if(this.formErrors[field] == '') {
              this.formErrors[field] += 
              this.validService.getValidatorErrorMessage(key, this.errorConfig[field][key]);
            }
          }
          this.emitErrorAction(field);

      }
      this.emitNotErrorAction(field);      
    }
  }

  emitErrorAction(field: any) {
    /* エラー発生時処理、継承先で実装 */
  }

  emitNotErrorAction(field: any){
    /* エラー未発生時処理、継承先で実装 */
  }

  setValidateErrorConfig(config: ValidateErrorConfig) {
    this.errorConfig = config;
  }


}
