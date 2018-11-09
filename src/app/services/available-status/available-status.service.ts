import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User, firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { AvailableStatus } from '../../models/available-status/available-status.model';

@Injectable({
  providedIn: 'root'
})
export class AvailableStatusService {

  availableStatusCol: AngularFirestoreCollection<AvailableStatus>;
  availableStatus$: Observable<AvailableStatus[]>;

  constructor(private db: AngularFirestore) {
    this.availableStatusCol = this.db.collection('available-status');

    this.availableStatus$ = this.availableStatusCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as AvailableStatus;
          data.uid = a.payload.doc.id;

          return data;
        });
      })
    );
  }

  getAvailableAgentsWithinRadius() {
    return this.availableStatus$;
  }

  getUserAvailableStatus(account: User) {
    return this.db.doc(`available-status/${account.uid}`).valueChanges();
  }

  async setUserAvailableStatusOnlineOrOffline(status: AvailableStatus, account: User) {
    const statusRef = (await this.db.doc(`available-status/${account.uid}`).ref.get()).exists;

    if (statusRef) {
      try {
        this.db.doc(`available-status/${account.uid}`).delete();
        return 'Deleted';
      } catch (e) {
        return e;
      }
    }

    status.created = firestore.FieldValue.serverTimestamp();
    status.lastUpdate = firestore.FieldValue.serverTimestamp();

    try {
      await this.db.doc(`available-status/${account.uid}`).set(status);
      return 'Updated';
    } catch (e) {
      return e;
    }
  }
}
