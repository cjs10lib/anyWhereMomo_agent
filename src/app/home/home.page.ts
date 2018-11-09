import { UserPresenceService } from './../services/user-presence/user-presence.service';
import { NotificationPageModule } from './../notification/notification.module';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationPosition } from '@capacitor/core';
import { User } from 'firebase';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, concatMap } from 'rxjs/operators';

import { Status } from '../models/status/status.model';
import { AuthService } from './../services/auth-service/auth.service';
import { StatusService } from './../services/status/status.service';
import { ModalController } from '@ionic/angular';
import { NotificationPage } from '../notification/notification.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  account: User;
  accountStatus: Status;

  agentsStatusWithinRadius: Status[] = [];
  isOnline: boolean;

  constructor(private router: Router,
    private authService: AuthService,
    private statusService: StatusService,
    private modalCtrl: ModalController,
    private userPresenceService: UserPresenceService) { }

  ngOnInit() {
    this.userPresenceService.setOnlineStatus();

    this.authService.getAuthState().pipe(concatMap(user => {
      this.account = user;

      // return this.statusService.getUserStatus(user);
      return this.statusService.getAgentsWithinRadius();
    }), takeUntil(this.destroy$)).subscribe(status => {
      status.length ? this.isOnline = true : this.isOnline = false;
      this.agentsStatusWithinRadius = status;
      console.log(status);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getGeolocation(event: GeolocationPosition) {
    this.accountStatus = {
      account: this.account.uid,
      position: {
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        speed: event.coords.speed,
        heading: event.coords.heading
      }
    };
  }

  navigateToNotificationsPage() {
    this.router.navigate(['notification']);
  }

  async toggleStatus() {
    const result = await this.statusService.setUserOnlineOrOffline(this.accountStatus, this.account);
    console.log(result);
  }

}
