import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  constructor(
    private service: AuthenticationService,
    private router: Router
  ) { }

  async singin() {
    try {
      await this.service.signInWithEmailAndPassword('dgzraul.web@gmail.com', 'dgzraul1402');
      this.router.navigate(['/app']);
    } catch (error) {
      alert(error);
    }
  }
}
