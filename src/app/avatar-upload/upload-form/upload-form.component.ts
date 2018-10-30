import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToAccountStatusPage() {
    this.router.navigate(['account-status']);
  }

}
