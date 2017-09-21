import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from '../common/validation/validation.service';

export abstract class BaseComponent {

  form: FormGroup;
  formErrors: Map<string, string>;

  constructor(private validService: ValidationService) { }

  buildForms() {
    this.form.valueChanges.subscribe(data => {
      this.onValueChange(data);
    });
    this.formErrors = new Map<string, string>();
    for (const control in this.form.controls) {
      this.formErrors.set(control, '');
    }
}

  onValueChange(data?: any) {
    for(const field in this.form.controls) {
      const control = this.form.get(field);
      this.formErrors.set(field, ''); 
      if (control && control.dirty && !control.valid) {
          for (const key in control.errors){
            this.formErrors.set(field, this.validService.getValidatorErrorMessage(key, field));
          }
          this.emitErrorAction(field);
      }
        if (control && control.dirty && control.valid) {
            this.emitNotErrorAction(field);
        }
    }
  }

  emitErrorAction(field: any) {
    /* エラー発生時処理、継承先で実装 */
  }

  emitNotErrorAction(field: any){
    /* エラー未発生時処理、継承先で実装 */
  }


}
