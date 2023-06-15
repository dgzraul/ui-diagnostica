import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {
  private api = `${environment.webservice.diagnostica}/speciality`;

  constructor(private http: HttpClient) { }

  find(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}`);
  }

}
