import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { UsersRoutingModule } from './users-routing.module';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { AppComponentsModule } from 'src/app/core/app-components/app-components.module';

@NgModule({
  declarations: [
    UpdateUserComponent,
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppComponentsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
