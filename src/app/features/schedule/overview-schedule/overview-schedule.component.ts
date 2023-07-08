import { Component } from '@angular/core';
import { DateTime } from 'luxon';

interface Hour {
  date: DateTime;
  hour: any;
}

@Component({
  selector: 'app-overview-schedule',
  templateUrl: './overview-schedule.component.html',
  styleUrls: ['./overview-schedule.component.css']
})
export class OverviewScheduleComponent {
  currentDate: DateTime;
  monthDays: number[] = [];
  selectedMonth: number;
  selectedYear: number;
  selectedDate: DateTime | null = null;
  hours: Hour[] = [];

  constructor() {
    this.currentDate = DateTime.now();
    this.selectedMonth = this.currentDate.month;
    this.selectedYear = this.currentDate.year;
    this.updateMonthDays();
  }

  updateMonthDays() {
    const daysInMonth = this.currentDate.daysInMonth;
    this.monthDays = Array.from(Array(daysInMonth), (_, i) => i + 1);
  }

  goToPreviousMonth() {
    this.currentDate = this.currentDate.minus({ months: 1 });
    this.selectedMonth = this.currentDate.month;
    this.selectedYear = this.currentDate.year;
    this.updateMonthDays();
  }

  goToNextMonth() {
    this.currentDate = this.currentDate.plus({ months: 1 });
    this.selectedMonth = this.currentDate.month;
    this.selectedYear = this.currentDate.year;
    this.updateMonthDays();
  }

  selectDate(day: number) {
    this.selectedDate = this.currentDate.set({ day });
    console.log(this.selectedDate.toLocaleString());
    this.generateHours();
  }

  generateHours() {
    this.hours = [];
    for (let hour = 0; hour < 24; hour++) {
      const dateWithHour = this.selectedDate!.set({ hour });
      this.hours.push({ date: dateWithHour, hour });
    }
  }

  selectHour(selectedHour: Hour) {
    const utcDateTime = selectedHour.date.toUTC();
    const mexicoCityDateTime = utcDateTime.setZone('America/Mexico_City');
  
    const formattedUTC = utcDateTime.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ');
    const formattedMexicoCity = mexicoCityDateTime.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ');
  
    alert(`Selected date and time in UTC: ${formattedUTC}\nSelected date and time in America/Mexico_City: ${formattedMexicoCity}`);
  }
}
