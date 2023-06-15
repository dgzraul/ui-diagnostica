import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const regexFecha = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const test = regexFecha.test(control.value)  
  if(control.value && test) {
    const values = control.value.split('/');    
    const day = parseInt(values[0]);
    const month = parseInt(values[1]);
    const year = parseInt(values[2]);
    const date = new Date(`${year}-${month}-${day}`);
    if(!isNaN(date.getTime())) {
      return null;
    }    
  }
  return { invalidDate: 'Formato invalido' };
}

