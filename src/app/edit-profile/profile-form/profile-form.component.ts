import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Profile } from '../../models/profile/profile.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {

  @Output() saveProfileResult: EventEmitter<boolean>;

  account: User;

  profile = {
    business: {
      contact: {}
    }
  } as Profile;

  businessTypes = [
    { name: 'Personal', code: 'PBE' },
    { name: 'Small Enterprise', code: 'SBE' },
    { name: 'Medium Enterprise', code: 'MBE' },
    { name: 'Large Enterprise', code: 'LBE' }
  ];

  subscription: Subscription;

  constructor(private authService: AuthService, private profileService: ProfileService) {
    this.saveProfileResult = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.subscription = this.authService.getAuthState().subscribe(user => {
      this.account = user;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async saveProfile() {
    const result = await this.profileService.addProfile(this.profile, this.account);
    this.saveProfileResult.emit(result);
  }

}
