import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CreateFormComponent } from './create-form/create-form.component';
import { OverviewFormComponent } from './overview-form/overview-form.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';

const routes: Routes = [
  { path: 'overview', component: OverviewFormComponent },
  { path: 'register', component: CreateFormComponent },
  { path: 'preview', component: PreviewFormComponent },
  { path: '**', redirectTo: 'overview' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
