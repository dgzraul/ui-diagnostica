import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { OverviewScheduleComponent } from './overview-schedule/overview-schedule.component';
import { AppComponentsModule } from 'src/app/core/app-components/app-components.module';


@NgModule({
  declarations: [
    OverviewScheduleComponent
  ],
  imports: [
    CommonModule,
    AppComponentsModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
