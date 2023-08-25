import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Module
import { MedicalHistoryRoutingModule } from './medical-history-routing.module';

// Components
import { CreateMedicalHistoryComponent } from './create-medical-history/create-medical-history.component';
import { UpdateMedicalHistoryComponent } from './update-medical-history/update-medical-history.component';


@NgModule({
  declarations: [
    CreateMedicalHistoryComponent,
    UpdateMedicalHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicalHistoryRoutingModule
  ]
})
export class MedicalHistoryModule { }
