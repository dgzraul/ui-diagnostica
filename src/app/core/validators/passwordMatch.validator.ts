import { ValidationErrors, AbstractControl } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password: string | null = control.parent?.get('password')?.value;
  const confirmPassword: string = control.value;
  
  if(confirmPassword) {
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
  }

  return null;
  
}