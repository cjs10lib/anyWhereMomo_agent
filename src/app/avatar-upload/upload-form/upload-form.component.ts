import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  @Input() accountId: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToAccountStatusPage() {
    this.router.navigate(['account-status', this.accountId]);
  }

}
