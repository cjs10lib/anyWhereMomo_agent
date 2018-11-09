import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserPresenceService {

  constructor(private db: AngularFirestore) { }

  setOnlineStatus() {
    const uid = firebase.auth().currentUser.uid;
    const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
    const userStatusFirestoreRef = this.db.doc(`status/${uid}`);

    const isOfflineForDatabase = {
      uid: uid,
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    const isOnlineForDatabase = {
      uid: uid,
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    const isOfflineForFirestore = {
      uid: uid,
      state: 'offline',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const isOnlineForFirestore = {
      uid: uid,
      state: 'online',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    firebase.database().ref('.info/connected').on('value', async function(snapshot) {
      if (snapshot.val() === false) {
        userStatusFirestoreRef.set(isOfflineForFirestore);
        return;
      }

      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
        userStatusDatabaseRef.set(isOnlineForDatabase);

        // We'll also add Firestore set here for when we come online.
        userStatusFirestoreRef.set(isOnlineForFirestore);
      });
    });
  }
}
