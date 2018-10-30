import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.page.html',
  styleUrls: ['./avatar-upload.page.scss'],
})
export class AvatarUploadPage implements OnInit {

  userAccountId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userAccountId = this.route.snapshot.paramMap.get('id');
  }

}
