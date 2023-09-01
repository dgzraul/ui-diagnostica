import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AppComponentsModule } from 'src/app/core/app-components/app-components.module';


// Components
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

@NgModule({
  declarations: [
    SingUpComponent,
    SingInComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    AppComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
