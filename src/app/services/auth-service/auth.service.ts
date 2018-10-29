import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Account } from '../../models/account/account.model';
import { LoginResponse } from './../../models/login-response/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  signUpWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      };
    } catch (e) {
      return <LoginResponse> {
        error: e
      };
    }
  }
}


