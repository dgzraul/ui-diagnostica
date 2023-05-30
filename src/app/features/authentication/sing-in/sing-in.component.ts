import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  public form: FormGroup; 
  public loading: boolean = false; 
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

  public submit(event: Event): void {
    // try {
    //   await this.service.signInWithEmailAndPassword('dgzraul.web@gmail.com', 'dgzraul1402');
    //   this.router.navigate(['']);
    // } catch (error) {
    //   alert(error);
    // }
  }

  // Form getters
  get IOEmail(): AbstractControl<any, any> | null  {
    return this.form.get('email');
  }

  get IOPassword(): AbstractControl<any, any> | null  {
    return this.form.get('password');
  }
}
