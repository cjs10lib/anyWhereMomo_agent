import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Status } from '../../models/status/status.model';
import { User, firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private db: AngularFirestore) { }

  getUserStatus(account: User) {
    return this.db.doc(`status/${account.uid}`).valueChanges();
  }

  async setUserOnline(status: Status, account: User) {
    const statusRef = (await this.db.doc(`status/${account.uid}`).ref.get()).exists;

    if (statusRef) {
      try {
        this.db.doc(`status/${account.uid}`).delete();
        return 'Deleted';
      } catch (e) {
        return e;
      }
    }

    status.created = firestore.FieldValue.serverTimestamp();
    status.lastUpdate = firestore.FieldValue.serverTimestamp();

    try {
      await this.db.doc(`status/${account.uid}`).set(status);
      return 'Updated';
    } catch (e) {
      return e;
    }
  }
}
