import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Interfaces
import { ISection } from 'src/app/core/interfaces';

// Services
import { OfficesService } from '../../offices/offices.service';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-overview-form',
  templateUrl: './overview-form.component.html',
  styleUrls: ['./overview-form.component.css']
})
export class OverviewFormComponent {
  // loaders
  public sections: ISection[];
  public offices: any[] = [];

  // forms controls 
  public officeControl: FormControl; 

  // variables

  constructor(
    private officesService: OfficesService,
    private formsService: FormsService,
    private formBuilder: FormBuilder
  ) { 
    this.officeControl = this.formBuilder.control(null, [Validators.required]); 
  
    this.sections = localStorage.getItem('questionnaire') ? JSON.parse(localStorage.getItem('questionnaire')!) as ISection[] : [];   

    this.officesService.findByUserFromToken().subscribe({
      next: (offices: any[]) => {
        this.offices = offices;
        this.officeControl.setValue(this.offices[0].id);
      }
    });

    this.officeControl.valueChanges.subscribe((office: string) => {
      console.log(office);
    });
  }

  public saveForm(): void {
    this.formsService.create(this.officeControl.value, this.sections).subscribe({
      next: (response: any) => {
        console.log(response);
      }
    });
  } 
}
