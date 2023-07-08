import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { OverviewScheduleComponent } from './overview-schedule/overview-schedule.component';


@NgModule({
  declarations: [
    OverviewScheduleComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
