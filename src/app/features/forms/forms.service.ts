import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private api = `${environment.webservice.diagnostica}/form`;

  constructor(private http: HttpClient) { }

  create(officeId: string, payload: any): Observable<any> {
    return this.http.post<any>(`${this.api}/office/${officeId}`, payload);
  }
}
