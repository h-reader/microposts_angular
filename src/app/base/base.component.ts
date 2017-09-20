import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class BaseComponent {

  form: FormGroup;
  validation: any;

  constructor() { }
/*
  public validControlError(field: string) {

    const control = this.form.get(field);
    if(control && control.dirty && !control.valid) {
      const validates = this.validation[field];
      for(const key in control.errors) {
        
      }
    }

    if(this.form.controls[field].hasError) {
      //this.form.controls[field].errors
    }
  }
  */
}
