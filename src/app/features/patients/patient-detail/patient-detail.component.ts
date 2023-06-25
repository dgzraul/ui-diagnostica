import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {
  public patient: any; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private router: Router
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id')!;    
    
    this.patientsService.findById(id).subscribe({
      next: (value) => {
        this.patient = value; 
      }
    });
  }

  public delete(): void {
    this.patientsService.delete(this.patient._id).subscribe({
      next: (value) => {
        this.router.navigate(['/patient']);
      },
    });
  }
}
