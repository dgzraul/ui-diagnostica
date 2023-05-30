import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const curpRegex =
  /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

export function curpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const test = curpRegex.test(control.value);
    return test || !control.value ? null : { curp: 'Formato invalido' };
  };
}

