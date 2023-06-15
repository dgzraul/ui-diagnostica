import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

// Serivces
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';
import { UsersService } from 'src/app/features/users/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.usersService.verifyRegister(this.authenticationService.firebaseAccount!.uid!).subscribe({
      next: (value) => {
        if(value.existingAccount == false)  {
          this.router.navigate(['/user/create_profile']);          
        } else {
          this.router.navigate(['/office/default_register']);
        }
      }
    });    

    // Listen sessión
    this.authenticationService.onFirebaseAccountStateChange$.subscribe((firebaseAccount: User | null) => {      
      if(firebaseAccount == null) {
        this.router.navigate(['/authentication']);    
      }      
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {});
  }
}
