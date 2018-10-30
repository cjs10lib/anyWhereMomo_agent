import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { AccountStatus } from '../../models/account-status/account-status.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountStatusService {

  constructor(private db: AngularFirestore) { }

  async verifyAccountStatus(accountId: string) {
    return (await this.db.doc(`account-status/${accountId}`).ref.get()).exists;
  }

  saveAccountStatusOnRegistration(accountId: string) {

    const accountStatus: AccountStatus = {
      status: 'PENDING',
      created: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
      this.db.doc(`account-status/${accountId}`).set(accountStatus);
      return true;
    } catch (e) {
      return false;
    }
  }
}


