import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { from } from 'rxjs';

// Serivces
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';
import { UsersService } from 'src/app/features/users/users.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  public findProfileLoading: boolean = true; 

  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    // Get token
    from(this.authenticationService.firebaseAccount!.getIdToken()).subscribe({
      next: (token) => {        
        // Find profile
        this.usersService.profile({token: token}).subscribe({
          next: (profile) => {                       
            if(profile == null)  {
              this.router.navigate(['/user/create_profile']);          
            } else {
              if(profile.offices.length <= 0) {
                this.router.navigate(['/office/default_register']);
              }
            }
          },
          error: (error) => {
            this.findProfileLoading = false;
          },
          complete: () => {
            this.findProfileLoading = false;
          },
        });            
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
