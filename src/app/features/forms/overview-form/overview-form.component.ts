import { Component } from '@angular/core';

// Interfaces
import { ISection } from 'src/app/core/interfaces';


@Component({
  selector: 'app-overview-form',
  templateUrl: './overview-form.component.html',
  styleUrls: ['./overview-form.component.css']
})
export class OverviewFormComponent {
  public sections: ISection[];

  constructor() { 
    this.sections = localStorage.getItem('questionnaire') ? JSON.parse(localStorage.getItem('questionnaire')!) as ISection[] : [];   
  }
}
