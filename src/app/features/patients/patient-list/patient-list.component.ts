import { Component } from '@angular/core';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  public patients: any[] = [];

  constructor(
    private service: PatientsService
  ){
    this.service.find().subscribe({
      next: (value: any[]) => {
        this.patients = value;       
      }
    })
  }
}
