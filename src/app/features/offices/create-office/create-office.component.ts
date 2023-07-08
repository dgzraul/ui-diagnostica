import { Component } from '@angular/core';
import { OfficesService } from '../offices.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialitiesService } from '../../specialities/specialities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-office',
  templateUrl: './create-office.component.html',
  styleUrls: ['./create-office.component.css']
})
export class CreateOfficeComponent {
  // variables
  public form: FormGroup; 
  public specialities: any[] = [];

  // loaders

  constructor(
    private officeService: OfficesService,
    private specialitiesService: SpecialitiesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Form
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.required]),
      specialities: this.formBuilder.array([], [Validators.minLength(1)])
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

    const parse = {
      name: this.form.value.name,
      specialities: this.form.value?.specialities.map((x: any) => x.id)
    }
    
    this.officeService.createToUserFromToken(parse).subscribe({
      next: (value: any) => {
        this.router.navigate(['/office']);
      }
    });
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
  get IOName(): AbstractControl<any, any> | null {
    return this.form.get('name');
  }

  get IOSpecialities(): FormArray {
    return this.form.get('specialities') as FormArray;
  }
}
