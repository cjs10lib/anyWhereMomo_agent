import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() { }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  navigateToEarningsPage() {
    this.router.navigate(['earnings']);
  }

  navigateToProfilePage() {
    this.router.navigate(['profile']);
  }

  navigateToAccountPage() {
    this.router.navigate(['account']);
  }

}
