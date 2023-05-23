import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { AuthenticationModule } from '../features/authentication/authentication.module';
import { PatientsModule } from '../features/patients/patients.module';

// Components
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['autenticacion']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['app']);

const routes: Routes = [
  {
    path: 'autenticacion',
    component: AuthenticationLayoutComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
    children: [
      { path: '', loadChildren: () => AuthenticationModule },
      { path: '**', redirectTo: '' }
    ]
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: '', loadChildren: () => PatientsModule },
      { path: '**', redirectTo: '' }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: 'autenticacion'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
