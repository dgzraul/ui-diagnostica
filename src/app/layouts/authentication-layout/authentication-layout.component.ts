import { Component } from '@angular/core';
import { slideAnimation } from './transition';

@Component({
  selector: 'app-authentication-layout',
  templateUrl: './authentication-layout.component.html',
  styleUrls: ['./authentication-layout.component.css'],
  animations: [ slideAnimation ]
})
export class AuthenticationLayoutComponent {

}
