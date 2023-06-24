import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private api = `${environment.webservice.diagnostica}/patient`;

  constructor(private http: HttpClient) { }

  find(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}`, {});
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, data);
  }
}
