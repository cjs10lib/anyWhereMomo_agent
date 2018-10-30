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

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) { }

  ngOnInit() { }

  async login(event: LoginResponse) {
    if (!event.error) {
      (await this.toastCtrl.create({ message: `Welcome to beep ${event.result.user.email}`, duration: 3000 })).present();

      this.navCtrl.navigateRoot('/edit-profile');
    } else {
      this.authError = event;
    }
  }
}
