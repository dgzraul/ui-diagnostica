import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

// Modules
import { AuthenticationModule } from '../features/authentication/authentication.module';
import { PatientsModule } from '../features/patients/patients.module';

// Components
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationLayoutComponent,
    ...canActivate(() => redirectLoggedInTo([''])),
    children: [
      { path: '', loadChildren: () => AuthenticationModule },
      { path: '**', redirectTo: '' }
    ]
  },
  
  {
    path: '',
    component: MainLayoutComponent,
    ...canActivate(() => redirectUnauthorizedTo(['authentication'])),
    children: [
      { path: '', loadChildren: () => PatientsModule },
      { path: '**', redirectTo: '' }
    ]
  },

  {
    path: '**',
    redirectTo: 'authentication'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
