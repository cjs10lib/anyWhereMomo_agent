import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { AccountStatus } from '../../models/account-status/account-status.model';

@Injectable({
  providedIn: 'root'
})
export class AccountStatusService {

  constructor(private db: AngularFirestore) { }

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
      console.log(e);
      return false;
    }
  }
}


