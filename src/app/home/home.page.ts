import { UserPresenceService } from './../services/user-presence/user-presence.service';
import { NotificationPageModule } from './../notification/notification.module';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationPosition } from '@capacitor/core';
import { User } from 'firebase';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, concatMap } from 'rxjs/operators';

import { AuthService } from './../services/auth-service/auth.service';
import { NotificationPage } from '../notification/notification.page';
import { AvailableStatus } from '../models/available-status/available-status.model';
import { AvailableStatusService } from '../services/available-status/available-status.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  account: User;
  availableStatus: AvailableStatus;

  isOnline: boolean;

  constructor(private router: Router,
    private authService: AuthService,
    private availableStatusService: AvailableStatusService,
    private userPresenceService: UserPresenceService) { }

  ngOnInit() {
    this.userPresenceService.setOnlineStatus();

    this.authService.getAuthState().pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.account = user;

      console.log(user);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getGeolocation(event: GeolocationPosition) {
    this.availableStatus = {
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

  getAvailableStatus(event: boolean) {
    this.isOnline = event;
  }

  navigateToNotificationsPage() {
    this.router.navigate(['notification']);
  }

  async toggleStatus() {
    const result = await this.availableStatusService.setUserAvailableStatusOnlineOrOffline(this.availableStatus, this.account);
    console.log(result);
  }

}
