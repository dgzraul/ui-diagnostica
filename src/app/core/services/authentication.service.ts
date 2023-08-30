import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, UserCredential, FacebookAuthProvider, sendPasswordResetEmail, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService { 
  private _firebaseAccountSubject: BehaviorSubject<User | null>;
  public readonly firebaseAccount$: Observable<User | null>;

  constructor(
    private auth: Auth
  ) {             
    this._firebaseAccountSubject = new BehaviorSubject<User | null>(this.auth.currentUser);
    this.firebaseAccount$ = this._firebaseAccountSubject.asObservable();
  }

  /**
   * Authentication with email and password (firebase)
   * @param email 
   * @param password 
   * @returns 
   */
  public signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {    
    return new Promise(async (resolve, reject) => {
      try {        
        const credential = await signInWithEmailAndPassword(this.auth, email, password);
        return resolve(credential); 
      } catch (error: any) {    
        switch (error.code) {
          case 'auth/user-not-found': {
            return reject('Usuario no registrado');
          }
  
          case 'auth/wrong-password': {
            return reject('Contraseña incorrecta');
          }
  
          case 'auth/invalid-email': {
            return reject('Correo electrónico invalido');
          }
  
          case 'auth/user-disabled': {
            return reject('La cuenta ha sido deshabilitada, por favor contacta a soporte');
          }
  
          default: {            
            return reject('Lo sentimos, algo ha salido mal, inténtalo más tarde');
          }
        }
      }
    });
  }

  /**
   * Register with email and password (firebase)
   * @param email 
   * @param password 
   * @returns 
   */
  public createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {
      try {
        const credential = await createUserWithEmailAndPassword(this.auth, email, password);      
        return resolve(credential);
      } catch (error: any) {
        switch(error.code) {
          case 'auth/email-already-in-use': {
            return reject('El correo electrónico se encuentra en uso');
          }

          case 'auth/account-exists-with-different-credential': {
            return reject('Detectamos una cuenta con el mismo correo pero con otra forma de autenticarse');
          }
  
          case 'auth/user-disabled': {
            return reject('La cuenta ha sido deshabilitada');
          }
  
          case 'auth/popup-closed-by-user': 
          case 'auth/cancelled-popup-request': {
            return reject('Autenticación cancelada');
          }
  
          case 'auth/popup-blocked': {
            return reject('El navegador ha bloqueado la ventana emergete de Google');
          } 
  
          default: {
            return reject('Lo sentimos, algo ha salido mal, inténtalo más tarde');
          }
        }
      }
    });
  }

  /**
   * Authentication / register with google provider (firebase)
   * @returns Promise<UserCredential>
   */
  public loginWithGoogle(): Promise<UserCredential> {    
    return new Promise(async (resolve, reject) => {
      try {
        let credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        return resolve(credential);
      } catch (error: any) {
        switch(error.code) {
          case 'auth/account-exists-with-different-credential': {
            return reject('Detectamos una cuenta con el mismo correo pero con otra forma de autenticarse');
          }
  
          case 'auth/user-disabled': {
            return reject('La cuenta ha sido deshabilitada');
          }
  
          case 'auth/popup-closed-by-user': 
          case 'auth/cancelled-popup-request': {
            return reject('Autenticación cancelada');
          }
  
          case 'auth/popup-blocked': {
            return reject('El navegador ha bloqueado la ventana emergete de Google');
          } 
  
          default: {
            return reject('Lo sentimos, algo ha salido mal, inténtalo más tarde');
          }
        }
      }
    });
    
  }

  /**
   * Authentication / register with facebook provider (firebase)
   * @returns 
   */
  public loginWithFacebook(): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {      
      try {
        let credential = await signInWithPopup(this.auth, new FacebookAuthProvider())
        return resolve(credential);
      } catch (error: any) {
        switch(error.code) {
          case 'auth/account-exists-with-different-credential': {
            return reject('Detectamos una cuenta con el mismo correo pero con otra forma de autenticarse');
          }
  
          case 'auth/user-disabled': {
            return reject('La cuenta ha sido deshabilitada');
          }
  
          case 'auth/popup-closed-by-user': 
          case 'auth/cancelled-popup-request': {
            return reject('Autenticación cancelada');
          }
  
          case 'auth/popup-blocked': {
            return reject('El navegador ha bloqueado la ventana emergete de Google');
          } 
  
          default: {
            return reject('Lo sentimos, algo ha salido mal, inténtalo más tarde');
          }
        }
      }
    });
  }

  /**
   * Recovery password (firebase)
   * @returns 
   */
  sendPasswordResetEmail(email: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await sendPasswordResetEmail(this.auth, email);
        return resolve();
      } catch (error: any) {        
        switch(error.code) {
          case 'auth/invalid-email': {
            return reject('El formato del correo electrónico es invalido');
          }

          case 'auth/user-disabled': {
            return reject('La cuenta ha sido deshabilitada');
          }
  
          case 'auth/user-not-found': {
            return reject('No se encontró ningún usuario con la dirección de correo electrónico proporcionado');
          }
  
          case 'auth/too-many-requests': {
            return reject('Se ha alcanzado el límite de solicitudes. Espera un momento antes de intentarlo nuevamente.');
          } 

          case 'auth/missing-email': {
            return reject('No se ha detectado ningún correo electrónico');
          }          
  
          default: {
            return reject('Lo sentimos, algo ha salido mal, inténtalo más tarde');
          }
        }
      }
    });
  }

  /**
   * Currently firebase account
   * @returns
   */
  public get firebaseAccount(): User | null {
    return this.auth.currentUser; 
  }

  /**
   * Firebase user (on sesión)
   */
  public get getFirebaseAccount(): User | null {
    return this._firebaseAccountSubject.value;
  }

  /**
   * Save firebase user (on sesión)
   */
   public setFirebaseAccount(firebaseUser: User | null): void {
    this._firebaseAccountSubject.next(firebaseUser);      
  }

  /**
   * Close current sessión (firebase)
   * @returns 
   */
  public logout(): Observable<void> {
    return new Observable<void>((subscriber) => {
      signOut(this.auth).then(() => {
        this._firebaseAccountSubject.next(null);
        subscriber.next();
        subscriber.complete();
      });
    });
  }
}
