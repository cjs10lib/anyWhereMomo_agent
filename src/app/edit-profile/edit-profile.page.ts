import { User } from 'firebase';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveProfileResult } from '../models/save-profile-result/save-profile-result.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  userAccount: User;

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToAvatarUploadPage(event: SaveProfileResult) {
    event.status ? this.router.navigate(['avatar-upload', event.account.uid]) : console.error(event.status);
  }

}
