import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { OfficesRoutingModule } from './offices-routing.module';

// Components
import { OfficeDefaultRegisterComponent } from './office-default-register/office-default-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OfficeDefaultRegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OfficesRoutingModule
  ]
})
export class OfficesModule { }
