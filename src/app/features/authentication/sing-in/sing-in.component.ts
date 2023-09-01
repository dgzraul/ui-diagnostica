import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from 'src/app/core/services/users.service';

// Validators
import { emailValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  public loginLoader: boolean = false; 
  public form: FormGroup; 
  public IOPasswordType: boolean = false; 

  constructor(
    private service: AuthenticationService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, emailValidator]),
      password: this.formBuilder.control(null, [Validators.required])
    }); 
  }

  togglePasswordType(): void {
    this.IOPasswordType = !this.IOPasswordType; 
  } 

  public async submit($event: Event): Promise<void> {
    $event.preventDefault(); 

    // rebound clicks
    if(this.loginLoader) return; 
    this.loginLoader = true; 

    try {
      await this.service.signInWithEmailAndPassword(this.IOEmail!.value, this.IOPassword!.value);  
      this.router.navigate(['']);        
    } catch (error: any) {
      M.toast({html: error});
    } finally {
      this.loginLoader = false;
    }
  }

  public async submitGoogleSocialAuth(): Promise<void> {
    try {
      const credential = await this.service.loginWithGoogle();
      this.service.setFirebaseAccount(credential.user);
      this.router.navigate(['']);
    } catch (error: any) {
      M.toast({html: error});
    }
  }

  public async submitFacebookSocialAuth(): Promise<void> {
    try {
      const credential = await this.service.loginWithFacebook();
      this.service.setFirebaseAccount(credential.user);
      this.router.navigate(['']);
    } catch (error: any) {
      M.toast({html: error});
    }
  }

  public async sendPasswordResetEmail(): Promise<void> {
    if(this.IOEmail?.errors) {
      if(this.IOEmail?.hasError('required')) {
        M.toast({html: 'Ingrese su correo electrónico'});
      } else if(this.IOEmail?.hasError('invalidEmail')) {
        M.toast({html: 'Correo electrónico con formato invalido'});
      }
      return; 
    }

    this.userService.recoveryPassword(this.IOEmail!.value).subscribe(() => {
      M.toast({html: 'Correo de recuperación enviado'});
    });
  }

  // Form getters
  get IOEmail(): AbstractControl<any, any> | null  {
    return this.form.get('email');
  }

  get IOPassword(): AbstractControl<any, any> | null  {
    return this.form.get('password');
  }
}
