import { AccountStatusService } from './../services/account-status/account-status.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

import { LoginResponse } from './../models/login-response/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authError: LoginResponse;

  constructor(private accountStatusService: AccountStatusService, private navCtrl: NavController, private toastCtrl: ToastController) { }

  ngOnInit() { }

  async login(event: LoginResponse) {
    if (!event.error) {
      (await this.toastCtrl.create({ message: `Welcome to beep ${event.result.user.email}`, duration: 3000 })).present();

      // verify if account status exists
      const status = await this.accountStatusService.verifyAccountStatus(event.result.user.uid);
      status ? this.navCtrl.navigateRoot('/') : this.navCtrl.navigateRoot('/edit-profile');

    } else {
      this.authError = event;
    }
  }
}
