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
  // private sidenav: any;
  // variables
  public projectVersion: string = environment.version;
  public user: any | null; 

  // loaders
  public findProfileLoading: boolean = true; 
  public createProfileLoading: boolean = false; 

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
          next: (user: any) => {   
            if(user) {              
              this.user = user; 
            } else {
              this.createProfileLoading = true;
                            
              // save profile
              this.createProfile({
                firebaseUID: this.authenticationService.getFirebaseAccount!.uid, 
                email: this.authenticationService.getFirebaseAccount!.email
              });

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

  /**
   * @description save profile
   * @param data 
   */
  private createProfile(data: any): any {
    this.usersService.createProfile(data).subscribe({
      next: (user: any) => {   
        this.user = user; 
      },
      error: (error) => {
        this.createProfileLoading = false; 
      },
      complete: () => {
        this.createProfileLoading = false; 
      }
    });
  } 

  logout() {
    this.authenticationService.logout().subscribe(() => {});
  }
}
