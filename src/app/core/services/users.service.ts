import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Variables
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = `${environment.webservice.diagnostica}/user`;

  constructor(private http: HttpClient) { }

  profile(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/profile`, data);
  }

  verifyRegister(firebaseUID: string): Observable<any> {
    return this.http.get<any>(`${this.api}/verify_firebase_account`, {params: {firebaseUID: firebaseUID}});
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }
}