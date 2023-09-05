import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

// Models
import { User } from 'firebase/auth';

// Serivces
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from 'src/app/core/services/users.service';

// Variables
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  // DOM element
  @ViewChild('sidenav', { static: false }) sidenavElement?: ElementRef;  

  // variables
  private sidenav: any;
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
            this.loadHTMLElements();
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

  private loadHTMLElements(): void {
    setTimeout(() => {
      this.sidenav = M.Sidenav.init(this.sidenavElement?.nativeElement, {});      
    }, 1);
  }

  /**
   * @description save profile
   * @param data 
   */
  private createProfile(data: any): any {
    this.usersService.create(data).subscribe({
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

  closeSidenav(): void {
    if(screen.width <= 992 && this.sidenav.isOpen) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {});
  }
}
