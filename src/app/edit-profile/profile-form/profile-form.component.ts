import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { Profile } from '../../models/profile/profile.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { User } from 'firebase';
import { Subscription, Subject, combineLatest } from 'rxjs';
import { SaveProfileResult } from '../../models/save-profile-result/save-profile-result.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() saveProfileResult: EventEmitter<SaveProfileResult>;
  @Input() userAccount: string;

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

  constructor(private authService: AuthService, private profileService: ProfileService) {
    this.saveProfileResult = new EventEmitter<SaveProfileResult>();
  }

  ngOnInit() {
    this.authService.getAuthState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.account = user;
      });

      if (this.userAccount) {
        this.profileService.getAuthenticatedUserProfile()
          .pipe(takeUntil(this.destroy$))
          .subscribe(profile => {
            this.profile = profile;
          });
      }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  async saveProfile() {
    const result = await this.profileService.addProfile(this.profile, this.account);
    this.saveProfileResult.emit({
      status: result,
      account: this.account
    });
  }

}
