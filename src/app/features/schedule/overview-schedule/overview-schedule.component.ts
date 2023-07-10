import { Component } from '@angular/core';
import { DateTime } from 'luxon';

// interface Hour {
//   date: DateTime;
//   hour: any;
// }

@Component({
  selector: 'app-overview-schedule',
  templateUrl: './overview-schedule.component.html',
  styleUrls: ['./overview-schedule.component.css']
})
export class OverviewScheduleComponent {  
  selectedDate: DateTime | null = null; 

  hours: string[] = [];
  selectedDateTime: DateTime | null = null;  
  selectedDay: number | null = null; 

  constructor() { }  

  generateHours() {
    this.hours = [];
    for (let hour = 0; hour < 12; hour++) {
      this.hours.push(`${hour === 0 ? 12 : hour.toString()}:00 am`);
    }
    for (let hour = 12; hour < 24; hour++) {
      this.hours.push(`${(hour === 12 ? 12 : hour - 12).toString()}:00 pm`);
    }
  }
  
  selectHour(selectedHour: string) {
    // XX const [hourString] = selectedHour.split(':');
    // XX const hour = parseInt(hourString) % 12; // Obtener la hora en formato de 24 horas
    // const selectedDateTime = this.selectedDateTime.set({ hour, minute: 0 });
    // this.selectedDateTime = selectedDateTime;
    // XX this.selectedDateTime = this.selectedDate.set({hour, minute: 0});
  }

  selectDateChange(date: DateTime): void {
    this.selectedDate = date; 
    this.generateHours();
  }  
}
