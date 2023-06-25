import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientRegisterComponent,
    PatientUpdateComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
