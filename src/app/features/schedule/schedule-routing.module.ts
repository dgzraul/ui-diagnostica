import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewScheduleComponent } from './overview-schedule/overview-schedule.component';

const routes: Routes = [
  { path: 'overview', component: OverviewScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
