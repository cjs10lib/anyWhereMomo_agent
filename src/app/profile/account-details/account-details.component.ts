import { AuthService } from './../../services/auth-service/auth.service';
import { Profile } from './../../models/profile/profile.model';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() accountProfile: EventEmitter<Profile>;

  profile = {
    business: {
      contact: {}
    }
  } as Profile;

  subscription: Subscription;

  constructor(private profileService: ProfileService,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) {
      this.accountProfile = new EventEmitter<Profile>();
    }

  ngOnInit() {
    this.authService.getAuthState().pipe(takeUntil(this.destroy$)).subscribe(async user => {

      if (!user) { return; }

      const loader = await this.loadingCtrl.create({message: 'Loading profile...'});
      loader.present();

      this.subscription = this.profileService.getAuthenticatedUserProfile()
        .subscribe(profile => {
          this.profile = profile;
          this.accountProfile.emit(profile);

          loader.dismiss();
        });

    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  async signOut() {
    await this.authService.signOut();
    this.navCtrl.navigateRoot('/login');
  }

}
