import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AuthenticationRoutingModule } from './authentication-routing.module';

// Components
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';

@NgModule({
  declarations: [
    SingUpComponent,
    SingInComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
