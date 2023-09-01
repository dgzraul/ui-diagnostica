import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AppSeparatorComponent } from './app-separator/app-separator.component';
import { AppCalendarComponent } from './app-calendar/app-calendar.component';
import { AppPageContainerComponent } from './app-page-container/app-page-container.component';
import { AppPageContainerTitleComponent } from './app-page-container-title/app-page-container-title.component';
import { AppPageSubcontainerComponent } from './app-page-subcontainer/app-page-subcontainer.component';
import { AppPrimaryBtnComponent } from './app-primary-btn/app-primary-btn.component';

@NgModule({
  declarations: [
    AppSeparatorComponent,
    AppCalendarComponent,
    AppPageContainerComponent,
    AppPageContainerTitleComponent,
    AppPageSubcontainerComponent,
    AppPrimaryBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppSeparatorComponent,
    AppCalendarComponent,
    AppPageContainerComponent,
    AppPageContainerTitleComponent,
    AppPageSubcontainerComponent,
    AppPrimaryBtnComponent
  ]
})
export class AppComponentsModule { }
