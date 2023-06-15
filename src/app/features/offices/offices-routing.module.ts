import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { OfficeDefaultRegisterComponent } from './office-default-register/office-default-register.component';

const routes: Routes = [
  { path: 'default_register', component: OfficeDefaultRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
