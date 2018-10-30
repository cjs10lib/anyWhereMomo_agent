import { AuthService } from './../../services/auth-service/auth.service';
import { Profile } from './../../models/profile/profile.model';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  profile = {
    business: {
      contact: {}
    }
  } as Profile;

  constructor(private profileService: ProfileService,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({message: 'Loading profile...'});
    loader.present();

    this.profileService.getAuthenticatedUserProfile().subscribe(profile => {
      this.profile = profile;

      loader.dismiss();
    });
  }

  async signOut() {
    await this.authService.signOut();
    this.navCtrl.navigateRoot('/login');
  }

}
