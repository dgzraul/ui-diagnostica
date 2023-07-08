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

  findByUserFromToken(): Observable<any> {
    return this.http.get<any>(`${this.api}/user`);
  }

  createToUserFromToken(payload: any): Observable<any> {
    return this.http.post<any>(`${this.api}/user`, payload);
  }
}
