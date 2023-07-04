import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  private api = `${environment.webservice.diagnostica}/office`;

  constructor(private http: HttpClient) { }

  createDefault(payload: any): Observable<any> {
    return this.http.post<any>(`${this.api}/create_default`, payload);
  }
}
