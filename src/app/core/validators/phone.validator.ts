import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const regExp = /^\d{10}$/;
  const test = regExp.test(control.value);
  return test || !control.value ? null : { invalidPhone: true };  
}

