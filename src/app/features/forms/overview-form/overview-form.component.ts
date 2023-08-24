import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  // variables
  public sections: ISection[];
  public offices: any[] = [];
  public currentOffice: any = null; 

  // forms controls 
  public officeControl: FormControl; 

  constructor(
    private officesService: OfficesService,
    private formsService: FormsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.officeControl = this.formBuilder.control(null, [Validators.required]); 
  
    this.sections = localStorage.getItem('questionnaire') ? JSON.parse(localStorage.getItem('questionnaire')!) as ISection[] : [];   

    this.officesService.findByUserFromToken().subscribe({
      next: (offices: any[]) => {
        this.offices = offices;
        this.officeControl.setValue(this.offices[0]);
        this.officeControl.updateValueAndValidity();
      }
    });

    this.officeControl.valueChanges.subscribe((office: any) => {
      this.currentOffice = office; 
      this.formsService.findByOffice(office._id).subscribe({
        next: (forms: any) => {
          this.currentOffice.forms = forms; 
          
          if(!localStorage.getItem('questionnaire')) {
            this.sections = this.currentOffice.forms.filter((form: any) => form.main)[0].structure;
          }
        }
      });
    });
  }

  public addSection(): void {    
    localStorage.setItem('questionnaire', JSON.stringify(this.sections));    
    this.router.navigate(['/form/register']);
  }

  public saveForm(): void {
    const payload = {
      structure: this.sections
    }

    this.formsService.create(this.currentOffice._id, payload).subscribe({
      next: (response: any) => {
        localStorage.removeItem('questionnaire');
        this.currentOffice.forms = this.currentOffice.forms.map((form: any) => {
          form.main = false;
          return form;
        });
        this.currentOffice.forms.push(response);
        this.sections = response.structure;
      }
    });
  } 

  public makeMain(formId: string): void {
    this.formsService.makeMainFromOffice(this.currentOffice._id, formId).subscribe({
      next: (response: any) => {
        this.currentOffice.forms = this.currentOffice.forms.map((form: any) => {
          if (form._id === formId) {
            form.main = true;
            if(!localStorage.getItem('questionnaire')) {
              this.sections = form.structure;            
            }
          } else {
            form.main = false;
          }
          return form;
        });
      }
    });
  }
}
