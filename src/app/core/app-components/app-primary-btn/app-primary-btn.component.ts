import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './app-primary-btn.component.html',
  styleUrls: ['./app-primary-btn.component.css']
})
export class AppPrimaryBtnComponent {
  @Input('loading') loading: boolean = false;
  @Input('type') type: string = 'submit';
  @Input('disabled') disabled: boolean = false;
}
