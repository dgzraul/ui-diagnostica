import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { OverviewScheduleComponent } from './overview-schedule/overview-schedule.component';
import { AppComponentsModule } from 'src/app/core/app-components/app-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OverviewScheduleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppComponentsModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
