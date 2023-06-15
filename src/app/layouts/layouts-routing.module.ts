import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

// Components
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationLayoutComponent,
    ...canActivate(() => redirectLoggedInTo([''])),
    children: [
      { path: '', loadChildren: () => import('../features/authentication/authentication.module').then(m => m.AuthenticationModule) },
      { path: '**', redirectTo: '' }
    ]
  },
  
  {
    path: '',
    component: MainLayoutComponent,
    ...canActivate(() => redirectUnauthorizedTo(['authentication'])),
    children: [
      { path: 'user', loadChildren: () => import('../features/users/users.module').then(m => m.UsersModule) },
      { path: 'office', loadChildren: () => import('../features/offices/offices.module').then(m => m.OfficesModule) },
      { path: '', loadChildren: () => import('../features/patients/patients.module').then(m => m.PatientsModule) },
      { path: '**', redirectTo: 'user' }
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
