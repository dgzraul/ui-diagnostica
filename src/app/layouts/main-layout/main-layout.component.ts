import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

// Serivces
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';
import { UserService } from 'src/app/features/user/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.userService.verifyRegister(this.authenticationService.firebaseAccount!.uid!).subscribe({
      next: (value) => {
        
      }
    });    

    // Listen sessión
    this.authenticationService.onFirebaseAccountStateChange$.subscribe((firebaseAccount: User | null) => {      
      if(firebaseAccount == null) {
        this.router.navigate(['authentication']);    
      }      
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {});
  }
}
