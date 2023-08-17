import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from './forms-routing.module';
import { CreateFormComponent } from './create-form/create-form.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { OverviewFormComponent } from './overview-form/overview-form.component';


@NgModule({
  declarations: [
    CreateFormComponent,
    PreviewFormComponent,
    OverviewFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormsRoutingModule
  ]
})
export class FormssModule { }
