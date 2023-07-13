import { Component } from '@angular/core';
import { DateTime } from 'luxon';

// interface Hour {
//   date: DateTime;
//   hour: any;
// }

interface TimeRange {
  inicio: DateTime;
  fin: DateTime;
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
      fin: DateTime.fromObject({ hour: 10, minute: 30 })
    },
    {
      inicio: DateTime.fromObject({ hour: 13, minute: 30 }),
      fin: DateTime.fromObject({ hour: 15, minute: 15 })
    }
  ];
  registros: string[] = [];
  nuevoRegistro: any = { titulo: '', horaInicio: '', horaFinal: '' };

  constructor() {
    this.generateHours();

    // Inicializar el modal
    setTimeout(() => {
      const modal = document.querySelector('#modal1');    
      M.Modal.init(modal); 
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

  // isHourInRanges(hour: number): boolean {
  //   for (const range of this.timeRanges) {
  //     const rangeStart = range.inicio.hour * 60 + range.inicio.minute;
  //     const rangeEnd = range.fin.hour * 60 + range.fin.minute;
  //     const currentHour = hour * 60;

  //     if (currentHour >= rangeStart && currentHour < rangeEnd) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

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
