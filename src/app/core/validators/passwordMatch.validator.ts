import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator() {
  return (form: FormGroup): ValidationErrors | null => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
  
    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  };
  
}