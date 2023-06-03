import { ValidationErrors, AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const password: string = control.value; 
  
  if(password) {
    if(!passwordRegExp.test(password)) {
      return { invalidPassword: true };
    }
  } 

  return null;  
}