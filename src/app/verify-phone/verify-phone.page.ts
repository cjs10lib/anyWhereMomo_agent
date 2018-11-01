import { WindowService } from './../services/window/window.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;


  // format phone number as E.164
  get e614() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.page.html',
  styleUrls: ['./verify-phone.page.scss'],
})
export class VerifyPhonePage implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;
  user: any;

  constructor(private win: WindowService) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    this.windowRef.recaptchaVerifier.render();
  }


  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e614;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(e => console.error(e));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
      })
      .catch(e => console.error(e, 'Incorrect code entered?'));
  }

}
