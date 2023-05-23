import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';

const routes: Routes = [
  { path: 'registro', component: SingUpComponent },
  { path: 'verificacion', component: SingInComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
