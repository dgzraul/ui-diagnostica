import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from 'src/app/core/services/users.service';

// Utils
import { dateValidator } from 'src/app/core/validators/date.validator';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  form: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      firebaseUID: this.formBuilder.control(this.authenticationService.firebaseAccount?.uid, [Validators.required]),
      email: this.formBuilder.control(this.authenticationService.firebaseAccount?.email, [Validators.required]),
      name: this.formBuilder.control(null, [Validators.required]),
      lastname: this.formBuilder.control(null, [Validators.required]),
      secondLastname: this.formBuilder.control(null, [Validators.required]),
      birthday: this.formBuilder.control(null, [Validators.required, dateValidator]),
      CURP: this.formBuilder.control(null, [Validators.required]),
    });    
  }

  submit($event: Event): void {
    $event.preventDefault(); 
    let data = this.form.value;
    data.birthday = this.stringToDate(this.form.get('birthday')?.value);
    this.usersService.create(data).subscribe({
      next: () => {
        this.router.navigate(['/authentication/create_default_office']);
      }
    });
  }

  stringToDate(date: string): string {
    const values = date.split('/');    
    return new Date(parseInt(values[0]), parseInt(values[1]) - 1, parseInt(values[2]), 0, 0, 0, 0).toISOString();
  }

  // Form getters
  get IOName(): AbstractControl<any, any> | null  {
    return this.form.get('name');
  }

  get IOLastname(): AbstractControl<any, any> | null  {
    return this.form.get('lastname');
  }

  get IOSecondLastname(): AbstractControl<any, any> | null  {
    return this.form.get('secondLastname');
  }

  get IOBirthday(): AbstractControl<any, any> | null  {
    return this.form.get('birthday');
  }

  get IOCURP(): AbstractControl<any, any> | null  {
    return this.form.get('CURP');
  }
}
