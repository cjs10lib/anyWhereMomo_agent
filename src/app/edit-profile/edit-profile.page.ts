import { NavController } from '@ionic/angular';
import { User } from 'firebase';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SaveProfileResult } from '../models/save-profile-result/save-profile-result.model';
import { NavComponent } from '@ionic/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  userAccount: string;

  constructor(private router: Router, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.userAccount = this.route.snapshot.queryParamMap.get('account');
  }

  navigateToAvatarUploadPage(event: SaveProfileResult) {
    if (this.userAccount) {
      this.router.navigate(['profile']);
      // this.navCtrl.navigateBack('/profile');
      return;
    }

    event.status ? this.router.navigate(['avatar-upload', event.account.uid]) : console.error(event.status);
  }

}
