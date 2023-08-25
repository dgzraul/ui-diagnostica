import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CreateMedicalHistoryComponent } from './create-medical-history/create-medical-history.component';
import { UpdateMedicalHistoryComponent } from './update-medical-history/update-medical-history.component';

const routes: Routes = [
  { path: 'create/patient/:id', component: CreateMedicalHistoryComponent },
  { path: 'update/:id', component: UpdateMedicalHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalHistoryRoutingModule { }
