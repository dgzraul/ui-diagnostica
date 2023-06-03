import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/core/validators/passwordMatch.validator';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {
  form: FormGroup; 
  public IOPasswordType: boolean = false; 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required])
    }, {
      validators: [passwordMatchValidator]
    });

    this.IOEmail?.valueChanges.subscribe(a => {
      console.log(this.IOEmail?.errors);
      
    })
  }

  togglePasswordType(): void {
    this.IOPasswordType = !this.IOPasswordType; 
  }

  public async submit($event: Event): Promise<void> {
    $event.preventDefault(); 
    
    try {
      await this.service.createUserWithEmailAndPassword(this.IOEmail!.value, this.IOPassword!.value);  
      this.router.navigate(['']);
    } catch (error: any) {
      M.toast({html: error});
    }
  }

  public async submitGoogleSocialAuth(): Promise<void> {
    try {
      await this.service.loginWithGoogle();
      this.router.navigate(['']);
    } catch (error: any) {
      M.toast({html: error});
    }
  }

  public async submitFacebookSocialAuth(): Promise<void> {
    try {
      await this.service.loginWithFacebook();
      this.router.navigate(['']);
    } catch (error: any) {
      M.toast({html: error});
    }
  }

  // Form getters
  get IOEmail(): AbstractControl<any, any> | null  {
    return this.form.get('email');
  }

  get IOPassword(): AbstractControl<any, any> | null  {
    return this.form.get('password');
  }
}
