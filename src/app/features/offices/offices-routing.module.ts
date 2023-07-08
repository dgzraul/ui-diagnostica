import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ListOfficeComponent } from './list-office/list-office.component';
import { UpdateOfficeComponent } from './update-office/update-office.component';
import { CreateOfficeComponent } from './create-office/create-office.component';

const routes: Routes = [
  { path: '', component: ListOfficeComponent },
  { path: 'create', component: CreateOfficeComponent },
  { path: 'update/:id', component: UpdateOfficeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
