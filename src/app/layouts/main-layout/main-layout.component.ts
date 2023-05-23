import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  async logout() {
    try {
      await this.authenticationService.logout();
      this.router.navigate(['autenticacion']);
    } catch (error) {
      alert(error);
    }
  }
}
