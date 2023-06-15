import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, from, switchMap } from 'rxjs';

// Services
import { AuthenticationService } from 'src/app/features/authentication/authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authenticationService.firebaseAccount!.getIdToken()).pipe(
      switchMap((token: string) => {
        return next.handle(token ? req.clone({ headers: req.headers.set('authorization', `Bearer ${token}`)}) : req );
      }),

      catchError((error: HttpErrorResponse) => {  
        switch (error.status) {
          case 401: {
            return this.authenticationService.logout().pipe(
              switchMap(() => { throw error })
            );
          }
        }
        throw error;
      })
    );
  }
}
