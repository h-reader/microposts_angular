import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
        'required': '値を入力して下さい',
        'email': '正しいメールアドレスを入力してください',
        'minlength': `${validatorValue.min} 文字以上入力してください`
    };

    return config[validatorName];
  }

}
