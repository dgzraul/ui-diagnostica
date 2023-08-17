import { Component } from '@angular/core';

// Interfaces
import { ISection } from 'src/app/core/interfaces';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.css']
})
export class PreviewFormComponent {
  sections: ISection[];

  constructor() {
    this.sections = localStorage.getItem('questionnaire') ? JSON.parse(localStorage.getItem('questionnaire')!).sections : [];    
    
  }
}
