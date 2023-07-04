import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { OfficeDefaultRegisterComponent } from './office-default-register/office-default-register.component';

const routes: Routes = [
  { path: 'singin', component: SingInComponent },
  { path: 'singup', component: SingUpComponent },
  { path: 'create_profile', component: UserRegisterComponent },
  { path: 'create_default_office', component: OfficeDefaultRegisterComponent} ,
  { path: '**', redirectTo: 'singin' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
