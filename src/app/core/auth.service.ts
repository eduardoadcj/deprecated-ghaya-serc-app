import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  async login(email: string, password: string, onComplete) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          onComplete(result);
        });
    } catch (e) {
      console.log(e);
      onComplete(false);
    }
  }

  logout() {
    return this.afAuth.signOut();
  }
  
}
