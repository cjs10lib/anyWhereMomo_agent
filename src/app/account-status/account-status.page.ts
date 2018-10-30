import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AccountStatusService } from './../services/account-status/account-status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.page.html',
  styleUrls: ['./account-status.page.scss'],
})
export class AccountStatusPage implements OnInit {

  accountId: string;

  constructor(private accountStatusService: AccountStatusService, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id');
  }

  acceptAccountReview() {
    const result = this.accountStatusService.saveAccountStatusOnRegistration(this.accountId);
    result ? this.navCtrl.navigateRoot('/') : console.error(result);
  }

}
