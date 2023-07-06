import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from 'src/app/core/services/users.service';

// Validators
import { dateValidator } from 'src/app/core/validators/date.validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  // variables
  public user: any | null; 
  public form: FormGroup;

  // Loaders 
  public findProfileLoader: boolean = true; 

  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Form
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.required]),
      lastname: this.formBuilder.control(null, [Validators.required]),
      secondLastname: this.formBuilder.control(null, [Validators.required]),
      birthday: this.formBuilder.control(null, [Validators.required, dateValidator]),
      CURP: this.formBuilder.control(null, [Validators.required]),
    });    

    // Get token
    from(this.authenticationService.firebaseAccount!.getIdToken()).subscribe({
      next: (token) => {    
  
        // Find profile
        this.usersService.profile({token: token}).subscribe({
          next: (user) => {
            this.user = user; 
            this.form.patchValue({
              name: user.name,
              lastname: user.lastname,
              secondLastname: user.secondLastname,
              birthday: user.birthday,
              CURP: user.CURP
            });
            this.form.updateValueAndValidity();
          },
          complete: () => {
            this.findProfileLoader = false; 
          }
        });

      }
    });
  }

  submit($event: Event): void {
    $event.preventDefault(); 
    let data = this.form.value;
    data.birthday = this.stringToDate(this.form.get('birthday')?.value);
    this.usersService.update(this.user._id, data).subscribe({
      next: (user: any) => {
        this.authenticationService.setSystemAccount(user);
        this.router.navigate(['/user/profile']);
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
