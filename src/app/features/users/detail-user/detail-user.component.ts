import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent {
  // variables
  public user: any | null; 

  // loaders

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
          }
        });
      }
    });
  }
}
