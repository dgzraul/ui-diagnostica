import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { PatientsService } from '../patients.service';

// Utils
import { emailValidator } from 'src/app/core/validators';
import { phoneValidator } from 'src/app/core/validators/phone.validator';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {
  public form: FormGroup; 

  constructor(
    private patientsService: PatientsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [emailValidator]),
      phone: this.formBuilder.control(null, [phoneValidator]),
      name: this.formBuilder.control(null, [Validators.required]),
      lastname: this.formBuilder.control(null, [Validators.required]),
      secondLastname: this.formBuilder.control(null, [])
    });
  }

  public submit($evet: Event): void {
    $evet.preventDefault();

    this.patientsService.register(this.form.value).subscribe({
      complete: () => {
        this.router.navigate(['/patient']);
      },
    })
  }

  // Form getters
  get IOEmail(): AbstractControl<any, any> | null  {
    return this.form.get('email');
  }

  get IOPhone(): AbstractControl<any, any> | null  {
    return this.form.get('phone');
  }

  get IOName(): AbstractControl<any, any> | null  {
    return this.form.get('name');
  }

  get IOLastname(): AbstractControl<any, any> | null  {
    return this.form.get('lastname');
  }

  get IOSecondLastname(): AbstractControl<any, any> | null  {
    return this.form.get('secondLastname');
  }
}
