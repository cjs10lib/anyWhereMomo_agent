import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Status } from '../../models/status/status.model';
import { User, firestore } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  statusCol: AngularFirestoreCollection<Status>;
  status$: Observable<Status[]>;

  constructor(private db: AngularFirestore) {
    this.statusCol = this.db.collection('status');

    this.status$ = this.statusCol.snapshotChanges().pipe(
      map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Status;
          data.uid = a.payload.doc.id;

          return data;
        });
      })
    );
  }

  getAgentsWithinRadius() {
    return this.status$;
  }

  getUserStatus(account: User) {
    return this.db.doc(`status/${account.uid}`).valueChanges();
  }

  async setUserOnlineOrOffline(status: Status, account: User) {
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
