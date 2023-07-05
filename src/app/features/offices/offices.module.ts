import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { OfficesRoutingModule } from './offices-routing.module';
import { ListOfficeComponent } from './list-office/list-office.component';
import { UpdateOfficeComponent } from './update-office/update-office.component';

@NgModule({
  declarations: [
    ListOfficeComponent,
    UpdateOfficeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OfficesRoutingModule
  ]
})
export class OfficesModule { }
