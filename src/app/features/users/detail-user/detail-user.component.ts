import { Component } from '@angular/core';
import { from } from 'rxjs';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent {
  // variables
  public user: any | null; 

  // loaders
  public findProfileLoader: boolean = true; 

  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService
  ) {
    // Get token
    from(this.authenticationService.firebaseAccount!.getIdToken()).subscribe({
      next: (token) => {    

        // Find profile
        this.usersService.profile({token: token}).subscribe({
          next: (user) => {
            this.user = user; 
          },
          complete: () => {
            this.findProfileLoader = false; 
          }
        });
      }
    });
  }
}
