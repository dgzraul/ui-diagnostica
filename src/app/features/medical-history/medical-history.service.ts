import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  private api = `${environment.webservice.diagnostica}/medical_history`;

  constructor(private http: HttpClient) { }

  create(patientId: string, payload: any): Observable<any> {
    return this.http.post<any>(`${this.api}/patient/${patientId}`, payload);
  }

  delete(medicalHistoryId: string, patientId: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${medicalHistoryId}/patient/${patientId}`);
  }   

  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }
}
