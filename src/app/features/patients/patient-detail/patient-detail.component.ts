import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { PatientsService } from '../patients.service';
import { OfficesService } from '../../offices/offices.service';
import { FormsService } from '../../forms/forms.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MedicalHistoryService } from '../../medical-history/medical-history.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {
  // variables
  public patient: any; 
  public offices: any[] = [];
  public currentOffice: any = null; 
  public sections: any[] = [];

  // forms controls 
  public officeControl: FormControl; 
  public formControl: FormControl; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private officesService: OfficesService,
    private medicalHistoryService: MedicalHistoryService,
    private formsService: FormsService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id')!;    
    
    this.patientsService.findById(id).subscribe({
      next: (value) => {
        this.patient = value; 
      }
    });

    this.officeControl = this.formBuilder.control(null, [Validators.required]); 
    this.formControl = this.formBuilder.control(null, [Validators.required]); 

    this.officesService.findByUserFromToken().subscribe({
      next: (offices: any[]) => {
        this.offices = offices;
        this.officeControl.setValue(this.offices[0]);
        this.officeControl.updateValueAndValidity();
      }
    });

    this.officeControl.valueChanges.subscribe((office: any) => {
      this.currentOffice = office; 
      this.formsService.findByOffice(office._id).subscribe({
        next: (forms: any) => {
          this.currentOffice.forms = forms; 
          this.formControl.setValue(this.currentOffice.forms.filter((form: any) => form.main)[0]);
        }
      });
    });

    this.formControl.valueChanges.subscribe((form: any) => {
      this.sections = form.structure;
    });
  }

  public deleteMedicalHistory(medicalHistoryId: string): void {
    this.medicalHistoryService.delete(medicalHistoryId, this.patient._id).subscribe({
      next: (value) => {
        const indice = this.patient.medicalHistories.findIndex((item: any) => item._id === medicalHistoryId);
        this.patient.medicalHistories.splice(indice, 1);
      },
    });
  }

  public delete(): void {
    this.patientsService.delete(this.patient._id).subscribe({
      next: (value) => {
        this.router.navigate(['/patient']);
      },
    });
  }
}
