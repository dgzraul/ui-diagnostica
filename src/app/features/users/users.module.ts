import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { UsersRoutingModule } from './users-routing.module';

// Components
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  declarations: [ 
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
