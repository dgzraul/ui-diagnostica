import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication.service';

// Validators
import { emailValidator } from 'src/app/core/validators';
import { from } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  public form: FormGroup; 
  public IOPasswordType: boolean = false; 

  constructor(
    private usersService: UsersService,
    private service: AuthenticationService,
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
    
    try {
      await this.service.signInWithEmailAndPassword(this.IOEmail!.value, this.IOPassword!.value);  
      this.getDiagnosticaAccount();
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

  public async sendPasswordResetEmail(): Promise<void> {
    if(this.IOEmail?.errors) {
      if(this.IOEmail?.hasError('required')) {
        M.toast({html: 'Por favor Ingrese su correo electrónico'});
      } else if(this.IOEmail?.hasError('invalidEmail')) {
        M.toast({html: 'El formato del correo electrónico es invalido'});
      }
      return; 
    }

    try {
      await this.service.sendPasswordResetEmail(this.IOEmail?.value);
      M.toast({html: 'Correo de recuperación enviado'});
    } catch (error: any) {
      M.toast({html: error});
    }
  }

  public getDiagnosticaAccount(): void {
    // Verify perfil status
    from(this.service.firebaseAccount!.getIdToken()).subscribe({
      next: (token) => {        
        // Find profile
        this.usersService.profile({token: token}).subscribe({
          next: (profile) => {                       
            this.service.setSystemAccount(profile);
            if(profile == null)  {
              this.router.navigate(['/authentication/create_profile']);          
            } else {
              if(profile.offices.length <= 0) {                
                this.router.navigate(['/authentication/create_default_office']);
              } else {
                this.router.navigate(['']);
              }
            }
          }
        });            
      }
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
