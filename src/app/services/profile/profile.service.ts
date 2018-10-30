import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../models/profile/profile.model';
import * as firebase from 'firebase';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore) { }

  addProfile(profile: Profile, account: User) {

    profile.business.contact.email = account.email;
    profile.created =  firebase.firestore.FieldValue.serverTimestamp();
    profile.lastUpdate =  firebase.firestore.FieldValue.serverTimestamp();

    try {
      this.db.doc(`profile/${account.uid}`).set(profile, { merge: true });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
