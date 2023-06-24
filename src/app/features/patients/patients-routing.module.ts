import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'register', component: PatientRegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
