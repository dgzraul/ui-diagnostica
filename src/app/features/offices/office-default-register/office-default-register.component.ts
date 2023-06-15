import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialitiesService } from '../../specialities/specialities.service';

@Component({
  selector: 'app-office-default-register',
  templateUrl: './office-default-register.component.html',
  styleUrls: ['./office-default-register.component.css']
})
export class OfficeDefaultRegisterComponent {
  public form: FormGroup; 
  public specialities: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private specialitiesService: SpecialitiesService
  ) {
    this.form = this.formBuilder.group({
      name: 'principal',
      specialities: this.formBuilder.array([])
    });

    this.specialitiesService.find().subscribe({
      next: (specialities) => {
        this.specialities = specialities;
      }
    });

    this.addSpeciality();
  }

  submit($event: Event) {
    $event.preventDefault();
  }

  // Speciality controls
  addSpeciality() {
    this.IOSpecialities.push(this.formBuilder.group({
      id: [null, Validators.required],
    }));
  }

  removeSpeciality(index: number) {
    this.IOSpecialities.removeAt(index);
  }

  checkAvailableSpecialityItem(object: any, indexA: number): boolean {    
    for (let index = 0; index < this.IOSpecialities.value.length; index++) {
      if(index != indexA) {
        const element = this.IOSpecialities.value[index];        
        if(element.id == object._id) return false; 
      }
    }      
    return true; 
  }

  checkAvailableSpecialities(): boolean {
    let counter = 0; 
    for (const speciality of this.specialities) {
      for (const item of this.IOSpecialities.value) {
        if(speciality._id == item.id) {
          counter+=1; 
          break; 
        }
      }
    }
    return counter == this.specialities.length; 
  }

  // Form getters
  get IOSpecialities(): FormArray {
    return this.form.get('specialities') as FormArray;
  }
}
