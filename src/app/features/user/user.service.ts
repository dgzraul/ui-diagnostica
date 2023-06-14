import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

// DTOs
import { IResponseVerifyUser } from "src/app/core/dtos/user/IResponseVerifyUser.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = `${environment.webservice.diagnostica}/user`;

  constructor(private http: HttpClient) { }

  verifyRegister(firebaseUID: string): Observable<IResponseVerifyUser> {
    return this.http.get<IResponseVerifyUser>(`${this.api}/verify_firebase_account`, {params: {firebaseUID: firebaseUID}});
  }
}