import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalHistoryService } from '../medical-history.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-medical-history',
  templateUrl: './create-medical-history.component.html',
  styleUrls: ['./create-medical-history.component.css']
})
export class CreateMedicalHistoryComponent {
  private patient: any = null; 
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private medicalHistoryService: MedicalHistoryService
  ) { 
    this.patient = { _id: this.activatedRoute.snapshot.paramMap.get('id') }

    this.form = this.formBuilder.group({
      description: this.formBuilder.control('', [Validators.required]),
    });
  }

  submit($event: Event) {
    $event.preventDefault();

    this.medicalHistoryService.create(this.patient._id, this.form.value).subscribe({
      next: (value) => {
        this.router.navigate(['/patient/detail', this.patient._id]);        
      }
    });
  }

  // Form getters
  get IODescription(): AbstractControl<any, any> | null  {
    return this.form.get('description');
  }
}
