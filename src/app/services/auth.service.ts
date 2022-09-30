import { Router } from '@angular/router';
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
   }

  signIn(email: string, password: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  registerUser(datos: Usuario){
    return this.angularFireAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }

  stateUser() {
    return this.angularFireAuth.authState;
  }

  resetPassword(email: string){
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  verifyEmail(){
    return this.angularFireAuth.currentUser;
  }
}
