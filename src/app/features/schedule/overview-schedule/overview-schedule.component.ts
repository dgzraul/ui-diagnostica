import { Component } from '@angular/core';
import { DateTime } from 'luxon';

// interface Hour {
//   date: DateTime;
//   hour: any;
// }

interface TimeRange {
  inicio: DateTime;
  fin: DateTime;
  label: string;
}

@Component({
  selector: 'app-overview-schedule',
  templateUrl: './overview-schedule.component.html',
  styleUrls: ['./overview-schedule.component.css']
})
export class OverviewScheduleComponent {  
  selectedDate: DateTime | null = null; 
  hours: { hour: string; isInRange: boolean }[] = [];

  timeRanges: TimeRange[] = [
    {
      inicio: DateTime.fromObject({ hour: 8, minute: 0 }),
      fin: DateTime.fromObject({ hour: 9, minute: 0 }),
      label: 'label uno'
    },

    {
      inicio: DateTime.fromObject({ hour: 9, minute: 0 }),
      fin: DateTime.fromObject({ hour: 10, minute: 0 }),
      label: 'label dos'
    },

    {
      inicio: DateTime.fromObject({ hour: 10, minute: 0 }),
      fin: DateTime.fromObject({ hour: 12, minute: 0 }),
      label: 'label tres'
    },

    {
      inicio: DateTime.fromObject({ hour: 13, minute: 0 }),
      fin: DateTime.fromObject({ hour: 15, minute: 0 }),
      label: 'label cuatro'
    },

    {
      inicio: DateTime.fromObject({ hour: 16, minute: 0 }),
      fin: DateTime.fromObject({ hour: 17, minute: 0 }),
      label: 'label cuatro'
    }
  ];


  registros: string[] = [];
  nuevoRegistro: any = { titulo: '', horaInicio: '', horaFinal: '' };

  constructor() {
    this.generateHours();
    this.sortTimeRanges();

    // Inicializar el modal
    setTimeout(() => {
      const modal = document.querySelector('#modal1');    
      M.Modal.init(modal); 
    });
  }

  sortTimeRanges() {
    this.timeRanges.sort((a, b) => {
      const inicioA = a.inicio.toMillis();
      const inicioB = b.inicio.toMillis();
  
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
      const rangeStart = range.inicio.hour * 60 + range.inicio.minute;
      const rangeEnd = range.fin.hour * 60 + range.fin.minute;
      const currentHour = hour * 60;

      if (currentHour >= rangeStart && currentHour < rangeEnd) {
        return true;
      }
    }
    return false;
  }

  getSquareTopPercentage(range: TimeRange): number {
    const minutesInHour = 60;
    const startHour = range.inicio.hour;
    const startMinute = range.inicio.minute;
  
    return ((startHour * minutesInHour + startMinute) / (24 * minutesInHour)) * 100;
  }
  
  getSquareHeightPercentage(range: TimeRange): number {
    const minutesInHour = 60;
    const startHour = range.inicio.hour;
    const startMinute = range.inicio.minute;
    const endHour = range.fin.hour;
    const endMinute = range.fin.minute;
  
    const totalMinutesInRange = (endHour * minutesInHour + endMinute) - (startHour * minutesInHour + startMinute);
  
    return (totalMinutesInRange / (24 * minutesInHour)) * 100;
  }
  
  getSquareZIndex(index: number): number {
    // Restar el índice al total de rangos para que los divs se superpongan correctamente
    const totalRanges = this.timeRanges.length;
    return totalRanges - index;
  }

  getSquareWidthPercentage(range: TimeRange, container: HTMLDivElement): number {
    // const minutesInHour = 60;
    // const startHour = range.inicio.hour;
    // const startMinute = range.inicio.minute;
    // const endHour = range.fin.hour;
    // const endMinute = range.fin.minute;

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
    const startA = rangeA.inicio.toMillis();
    const endA = rangeA.fin.toMillis();
    const startB = rangeB.inicio.toMillis();
    const endB = rangeB.fin.toMillis();  
    return startA < endB && endA > startB;
  }

  findOverlappingRanges(time: DateTime): TimeRange[] {
    return this.timeRanges.filter(range => {
      const start = range.inicio;
      const end = range.fin;
  
      return time >= start && time <= end;
    });
  }  

  getMinutesPercentage(hour: number): number {
    const minutesInHour = 60;
    let totalMinutesInRange = 0;

    for (const range of this.timeRanges) {
      const rangeStart = range.inicio.hour * minutesInHour + range.inicio.minute;
      const rangeEnd = range.fin.hour * minutesInHour + range.fin.minute;
      const currentHour = hour * minutesInHour;

      if (currentHour >= rangeStart && currentHour < rangeEnd) {
        totalMinutesInRange += Math.min(rangeEnd, currentHour + minutesInHour) - Math.max(rangeStart, currentHour);
      }
    }

    return (totalMinutesInRange / minutesInHour) * 100;
  }
   
   abrirModal(hora: string) {
    // Abrir el modal y establecer la hora seleccionada en el formulario
    const modalInstance = M.Modal.getInstance(document.querySelector('#modal1'));
    modalInstance.open();

    this.nuevoRegistro.horaInicio = hora;
  }

  guardarRegistro() {
    // Lógica para guardar el registro

    // Obtener la hora de inicio y hora final en formato de Luxon
    const horaInicio = DateTime.fromFormat(this.nuevoRegistro.horaInicio, 'hh:mm a');
    const horaFinal = DateTime.fromFormat(this.nuevoRegistro.horaFinal, 'hh:mm a');

    console.log(horaInicio.toFormat('hh:mm a'), horaFinal.toFormat('hh:mm a'));
    

    // // Pintar el registro en la lista de horas
    // const indexInicio = this.horas.indexOf(horaInicio.toFormat('hh a'));
    // const indexFinal = this.horas.indexOf(horaFinal.toFormat('hh a'));
    // for (let i = indexInicio; i <= indexFinal; i++) {
    //   const horaRegistro = this.horas[i] + ' (registro)';
    //   if (!this.registros.includes(horaRegistro)) {
    //     this.registros.push(horaRegistro);
    //   }
    // }

    // Cerrar el modal
    const modalInstance = M.Modal.getInstance(document.querySelector('#modal1'));
    modalInstance.close();
  }  

  selectDateChange(date: DateTime): void {
    this.selectedDate = date; 
    // this.generateHours();
  }  
}
