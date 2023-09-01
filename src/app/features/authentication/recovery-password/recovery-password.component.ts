import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication.service';

// Validators
import { passwordMatchValidator, passwordValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent {
  public recoveryLoader: boolean = true;
  public form: FormGroup;
  public IOPasswordType: boolean = false; 

  private code: string | null;
  private email: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { 
    // get query params 
    this.code = this.activatedRoute.snapshot.queryParamMap.get('fcode');
    this.email = null; 

    this.form = this.formBuilder.group({
      password: this.formBuilder.control(null, [Validators.required, passwordValidator]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, passwordMatchValidator])
    });

    this.init();
  }
  
  private async init() {
    if(this.code) {
      try {
        // verify recovery password code
        this.email = await this.authenticationService.validateRecoveryPasswordCode(this.code);
      } catch (error: any) {
        M.toast({html: error});
        this.router.navigate(['/authentication']);
      } finally {
        this.recoveryLoader = false;
      }
    }
  }

  togglePasswordType(): void {
    this.IOPasswordType = !this.IOPasswordType; 
  } 

  public async submit($event: Event): Promise<void> {
    $event.preventDefault();

    // rebound clicks
    if(this.recoveryLoader) return; 
    this.recoveryLoader = true;

    try {
      // update password
      await this.authenticationService.confirmPasswordReset(this.code!, this.IOPassword!.value);
      // auto sing in
      const credential = await this.authenticationService.signInWithEmailAndPassword(this.email!, this.IOPassword!.value);
      this.authenticationService.setFirebaseAccount(credential.user);
      this.router.navigate(['']);
    } catch (error: any) {
      M.toast({html: error});
      this.router.navigate(['/authentication']);
    } finally {
      this.recoveryLoader = false;
    }
  }  

  // Form getters 
  get IOPassword(): AbstractControl<any, any> | null  {
    return this.form.get('password');
  }

  get IOConfirmPassword(): AbstractControl<any, any> | null  {
    return this.form.get('confirmPassword');
  }
}
