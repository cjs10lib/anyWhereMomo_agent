import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../models/profile/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: Profile;

  constructor(private router: Router) { }

  ngOnInit() { }

  getProfile(event: Profile) {
    this.profile = event;
  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  navigateToEditProfilePage() {
    this.router.navigate(['edit-profile'], {
      queryParams: { account:  `${this.profile.firstName} ${this.profile.lastName}` }
    });
  }
}
