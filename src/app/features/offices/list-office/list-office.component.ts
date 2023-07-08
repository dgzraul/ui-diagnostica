import { Component } from '@angular/core';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.css']
})
export class ListOfficeComponent {
  // variables
  public offices: any[] = [];

  // loaders
  public findOfficesLoader: boolean = true;

  constructor(
    private officesService: OfficesService
  ) {
    this.officesService.findByUserFromToken().subscribe({
      next: (offices: any[]) => {
        this.offices = offices;
      },
      error: (error) => {
        this.findOfficesLoader = false; 
      },
      complete: () => {
        this.findOfficesLoader = false;
      },
    });
  }
}
