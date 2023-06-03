import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'firebase/auth';

// Services
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  public form: FormGroup; 
  public IOPasswordType: boolean = false; 

  constructor(
    private service: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
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
