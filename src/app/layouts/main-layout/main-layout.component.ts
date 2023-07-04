import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

// Models
import { User } from 'firebase/auth';

// Serivces
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from 'src/app/features/users/users.service';

// Variables
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  projectVersion: string = environment.version;
  sidenav: any;
  public findProfileLoading: boolean = true; 

  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {    
    // this.sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {})[0];

    // Get token
    from(this.authenticationService.firebaseAccount!.getIdToken()).subscribe({
      next: (token) => {        
        // Find profile
        this.usersService.profile({token: token}).subscribe({
          next: (profile) => {   
            if(profile == null || profile.offices.length <= 0) {
              this.logout();
            }
          },
          error: (error) => {
            this.findProfileLoading = false;
          },
          complete: () => {
            this.findProfileLoading = false;
          }
        });            
      }
    });

    // Listen sessión
    this.authenticationService.firebaseAccount$.subscribe((firebaseAccount: User | null) => {            
      if(firebaseAccount == null) {
        this.router.navigate(['/authentication']);    
      }      
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {});
  }
}
