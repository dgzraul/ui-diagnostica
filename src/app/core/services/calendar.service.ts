import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private api = `${environment.webservice.diagnostica}/calendar`;

  constructor(private http: HttpClient) { }

  findByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.api}/event`, { params: { date } });
  }

  create(payload: any): Observable<any> {
    return this.http.post<any>(`${this.api}/event`, payload);
  }
}
