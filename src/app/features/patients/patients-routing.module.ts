import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'register', component: PatientRegisterComponent },
  { path: 'detail/:id', component: PatientDetailComponent },
  { path: 'update/:id', component: PatientUpdateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
