import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  { path: 'create_profile', component: UserRegisterComponent },
  { path: '**', redirectTo: 'create_profile' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
