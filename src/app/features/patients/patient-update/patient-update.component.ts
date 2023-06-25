import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { PatientsService } from '../patients.service';

// Utils
import { emailValidator } from 'src/app/core/validators';
import { phoneValidator } from 'src/app/core/validators/phone.validator';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent {
  public form: FormGroup; 
  public patient: any; 

  constructor(
    private patientsService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id')!;    

    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [emailValidator]),
      phone: this.formBuilder.control(null, [phoneValidator]),
      name: this.formBuilder.control(null, [Validators.required]),
      lastname: this.formBuilder.control(null, [Validators.required]),
      secondLastname: this.formBuilder.control(null, [])
    });
    
    this.patientsService.findById(id).subscribe({
      next: (value) => {
        this.patient = value; 
        this.form.setValue({
          email: this.patient.email,
          phone: this.patient.phone,
          name: this.patient.name,
          lastname: this.patient.lastname,
          secondLastname: this.patient.secondLastname,
        });
        this.form.updateValueAndValidity();
      }
    });
  }

  public submit($evet: Event): void {
    $evet.preventDefault();

    this.patientsService.update(this.patient._id, this.form.value).subscribe({
      complete: () => {
        this.router.navigate(['/patient/detail', this.patient._id]);
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
