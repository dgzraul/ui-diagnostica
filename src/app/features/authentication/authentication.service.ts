import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, UserCredential, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: Auth
  ) { }

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {    
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

  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      try {
        const credential = createUserWithEmailAndPassword(this.auth, email, password);
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

  loginWithGoogle(): Promise<UserCredential> {    
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

  loginWithFacebook(): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {
      console.log(1111111);
      
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

  logout() {
    return signOut(this.auth);
  }

}
