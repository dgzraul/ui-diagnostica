import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AppSeparatorComponent } from './app-separator/app-separator.component';

@NgModule({
  declarations: [
    AppSeparatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppSeparatorComponent
  ]
})
export class AppComponentsModule { }
