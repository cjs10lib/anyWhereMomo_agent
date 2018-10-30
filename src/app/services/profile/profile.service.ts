import { AuthService } from './../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../models/profile/profile.model';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { switchMapTo, switchMap, take, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  getAuthenticatedUserProfile() {
    // return this.authService.getAuthState()
    //   .pipe(switchMap(user => this.db.doc(`profile/${user.uid}`)
    //   .valueChanges().pipe(take(1))));

    return this.authService.getAuthState()
      .pipe(map(user => user.uid),
      mergeMap(authId => this.db.doc(`profile/${authId}`)
      .valueChanges().pipe(take(1))));
  }

  getProfile(accountId: string) {
    return this.db.doc(`profile/${accountId}`).valueChanges().pipe(take(1));
  }

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
