import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';
import { CalendarService } from 'src/app/core/services/calendar.service';

interface TimeRange {
  start: DateTime;
  end: DateTime;
  label: string;
}

interface Hour {
  hour: string;
  isInRange: boolean;
}

@Component({
  selector: 'app-overview-schedule',
  templateUrl: './overview-schedule.component.html',
  styleUrls: ['./overview-schedule.component.css']
})
export class OverviewScheduleComponent implements AfterViewInit {  
  public formModal: any; 
  public form: FormGroup
  selectedDate: DateTime | null = null; 
  hours: Hour[] = [];
  timeRanges: TimeRange[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private calendarService: CalendarService
  ) {
    this.generateHours();
    this.sortTimeRanges();

    this.form = this.formBuilder.group({
      label: this.formBuilder.control(null),
      start: this.formBuilder.control(null),
      end: this.formBuilder.control(null)
    });
  }

  ngAfterViewInit(): void {    
    this.formModal = M.Modal.init(document.querySelector('#formModal'), { dismissible: true });
  }

  submit(event: Event) {
    event.preventDefault();
    const { label, start, end } = this.form.value;
    this.calendarService.create({
      date: this.selectedDate?.toISODate(),
      timeRanges: [{ 
        label: label,
        start: DateTime.fromFormat(start, 'hh:mm a').toISO(),
        end: DateTime.fromFormat(end, 'hh:mm a').toISO()
      }]
    }).subscribe({
      next: (data) => {
        data.timeRanges.map((range: any) => {
          range.start = DateTime.fromISO(range.start);
          range.end = DateTime.fromISO(range.end);
        });
        this.timeRanges = data.timeRanges;
      }
    });

    this.formModal.close();
    this.form.reset();  
  }

  sortTimeRanges() {
    this.timeRanges.sort((a, b) => {
      const inicioA = a.start.toMillis();
      const inicioB = b.start.toMillis();
  
      if (inicioA < inicioB) {
        return -1;
      } else if (inicioA > inicioB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  generateHours() {
    const startHour = 0; // Hora de inicio (0-23)
    const endHour = 23; // Hora de fin (0-23)

    for (let i = startHour; i <= endHour; i++) {
      const hour = DateTime.fromObject({ hour: i }).toFormat('HH:mm');
      const isInRange = this.isHourInRange(i);
      this.hours.push({ hour, isInRange });
    }
  }

  isHourInRange(hour: number): boolean {
    for (const range of this.timeRanges) {
      const rangeStart = range.start.hour * 60 + range.start.minute;
      const rangeEnd = range.end.hour * 60 + range.end.minute;
      const currentHour = hour * 60;

      if (currentHour >= rangeStart && currentHour < rangeEnd) {
        return true;
      }
    }
    return false;
  }

  getSquareTopPercentage(range: TimeRange): number {
    const minutesInHour = 60;
    const startHour = range.start.hour;
    const startMinute = range.start.minute;
  
    return ((startHour * minutesInHour + startMinute) / (24 * minutesInHour)) * 100;
  }
  
  getSquareHeightPercentage(range: TimeRange): number {
    const minutesInHour = 60;
    const startHour = range.start.hour;
    const startMinute = range.start.minute;
    const endHour = range.end.hour;
    const endMinute = range.end.minute;
  
    const totalMinutesInRange = (endHour * minutesInHour + endMinute) - (startHour * minutesInHour + startMinute);
  
    return (totalMinutesInRange / (24 * minutesInHour)) * 100;
  }
  
  getSquareZIndex(index: number): number {    
    const totalRanges = this.timeRanges.length;
    return totalRanges - index;
  }

  getSquareWidthPercentage(range: TimeRange, container: HTMLDivElement): number {
    // const minutesInHour = 60;
    // const startHour = range.start.hour;
    // const startMinute = range.start.minute;
    // const endHour = range.end.hour;
    // const endMinute = range.end.minute;

    // const totalMinutesInRange = (endHour * minutesInHour + endMinute) - (startHour * minutesInHour + startMinute);
    // const widthPercentage = (totalMinutesInRange / (24 * minutesInHour)) * 100;

    return 100;
    // return widthPercentage <= 100 ? widthPercentage : 100;
  }

  getSquareLeftPercentage(range: TimeRange, container: HTMLDivElement, index: number): number {
    // Obtener la cantidad de tiempo repetido del rango
    const overlappedCount = this.timeRanges.map(existingRange => this.hasRangeOverlap(range, existingRange)).filter(i => i == true).length;
    // Obtener cuantas veces del tiempo repetido del rango ya se utilizó
    const ranges = this.timeRanges.slice(0, index).map(existingRange => this.hasRangeOverlap(range, existingRange)).filter(i => i == true).length;     
    return (100 / overlappedCount) * ranges + (ranges == 0 ? 7 : 0);
  }

  hasRangeOverlap(rangeA: TimeRange, rangeB: TimeRange): boolean {
    const startA = rangeA.start.toMillis();
    const endA = rangeA.end.toMillis();
    const startB = rangeB.start.toMillis();
    const endB = rangeB.end.toMillis();  
    return startA < endB && endA > startB;
  }

  findOverlappingRanges(time: DateTime): TimeRange[] {
    return this.timeRanges.filter(range => {
      const start = range.start;
      const end = range.end;
  
      return time >= start && time <= end;
    });
  }  

  getMinutesPercentage(hour: number): number {
    const minutesInHour = 60;
    let totalMinutesInRange = 0;

    for (const range of this.timeRanges) {
      const rangeStart = range.start.hour * minutesInHour + range.start.minute;
      const rangeEnd = range.end.hour * minutesInHour + range.end.minute;
      const currentHour = hour * minutesInHour;

      if (currentHour >= rangeStart && currentHour < rangeEnd) {
        totalMinutesInRange += Math.min(rangeEnd, currentHour + minutesInHour) - Math.max(rangeStart, currentHour);
      }
    }

    return (totalMinutesInRange / minutesInHour) * 100;
  }
   
  openFormModal(hora: string) {
    this.IOStart?.setValue(DateTime.fromFormat(hora, 'HH:mm').toFormat('HH:mm a'));
    this.IOEnd?.setValue(DateTime.fromFormat(hora, 'HH:mm').plus({hours: 1}).toFormat('HH:mm a'));
    this.formModal.open();
  } 

  selectDateChange(date: DateTime): void {
    this.selectedDate = date; 
    this.calendarService.findByDate(date.toISODate() as string).subscribe({
      next: (data) => {
        if(data) {
          data.timeRanges.map((range: any) => {
            range.start = DateTime.fromISO(range.start);
            range.end = DateTime.fromISO(range.end);
          });
          this.timeRanges = data.timeRanges;      
        } else {
          this.timeRanges = [];
        }        
      }
    });
  }  

  // Form getters
  get IOLabel(): AbstractControl<any, any> | null  {
    return this.form.get('label');
  }

  get IOStart(): AbstractControl<any, any> | null  {
    return this.form.get('start');
  }

  get IOEnd(): AbstractControl<any, any> | null  {
    return this.form.get('end');
  }
}
