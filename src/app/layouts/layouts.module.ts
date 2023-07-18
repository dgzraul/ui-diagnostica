import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { LayoutsRoutingModule } from './layouts-routing.module';

// Components
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { AppComponentsModule } from '../core/app-components/app-components.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    AuthenticationLayoutComponent
  ],
  imports: [
    CommonModule,
    AppComponentsModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
