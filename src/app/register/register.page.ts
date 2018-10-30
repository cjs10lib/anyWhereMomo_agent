import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

import { LoginResponse } from './../models/login-response/login-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) { }

  ngOnInit() {}

  async register(event: LoginResponse) {
    console.log(event);
    if (!event.error) {
      (await this.toastCtrl.create({ message: `Welcome to beep ${event.result.user.email}`, duration: 3000 })).present();

      this.navCtrl.navigateRoot('/');
    } else {
      (await this.toastCtrl.create({ message: event.error.message, duration: 3000 })).present();
    }
  }

}
