import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.css']
})
export class AppCalendarComponent implements AfterViewInit {
  @Output() selectedDateChange: EventEmitter<DateTime> = new EventEmitter<DateTime>();
  selectedDate: DateTime;
  calendarDays: any[] = [];

  constructor() {
    this.selectedDate = DateTime.now();
    this.generateCalendarDays();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.selectedDateChange.emit(this.selectedDate.set({hour: 0, minute: 0, second: 0, millisecond: 0}));         
    // });
  }

  generateCalendarDays() {
    const daysInMonth = this.selectedDate.daysInMonth;
    const firstDayOfWeek = this.selectedDate.startOf('month').weekday;
  
    this.calendarDays = [];
  
    // Obtener el número de días de la semana del mes anterior que se mostrarán
    const daysFromPreviousMonth = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1;
  
    // Obtener la fecha del mes anterior y el mes siguiente
    const previousMonth = this.selectedDate.minus({ months: 1 });
  
    // Generar los días del mes anterior
    for (let i = previousMonth.daysInMonth! - daysFromPreviousMonth + 1; i <= previousMonth.daysInMonth!; i++) {
      this.calendarDays.push({ day: i, isCurrentMonth: false, isSelected: false });
    }
  
    // Generar los días del mes actual
    for (let i = 1; i <= daysInMonth!; i++) {
      const date = this.selectedDate.set({ day: i });
      const isCurrentDay = date.hasSame(DateTime.now(), 'day');
      const isSelected = date.hasSame(this.selectedDate, 'day');
      this.calendarDays.push({ day: i, isCurrentMonth: true, isCurrentDay: isCurrentDay, isSelected: isSelected });
    }
  
    // Generar los días del mes siguiente
    for (let i = 1; this.calendarDays.length < 42; i++) {
      this.calendarDays.push({ day: i, isCurrentMonth: false, isSelected: false });
    }

    setTimeout(() => {
      this.selectedDateChange.emit(this.selectedDate.set({hour: 0, minute: 0, second: 0, millisecond: 0}));
    });
  }  

  goToPreviousMonth() {
    this.selectedDate = this.selectedDate.minus({ months: 1 });
    this.generateCalendarDays();
  }

  goToNextMonth() {
    this.selectedDate = this.selectedDate.plus({ months: 1 });
    this.generateCalendarDays();
  }

  selectDate(day: number, isCurrentMonth: boolean): void {
    if (isCurrentMonth) {
      this.selectedDate = this.selectedDate.set({ day });
      
      this.calendarDays.forEach((calendarDay) => {
        calendarDay.isSelected = calendarDay.day === day && calendarDay.isCurrentMonth;
      });

      this.selectedDateChange.emit(this.selectedDate.set({hour: 0, minute: 0, second: 0, millisecond: 0}));
    }    
  }
}
