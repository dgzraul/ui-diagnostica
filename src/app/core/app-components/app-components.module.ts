import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AppSeparatorComponent } from './app-separator/app-separator.component';
import { AppCalendarComponent } from './app-calendar/app-calendar.component';

@NgModule({
  declarations: [
    AppSeparatorComponent,
    AppCalendarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppSeparatorComponent,
    AppCalendarComponent
  ]
})
export class AppComponentsModule { }
