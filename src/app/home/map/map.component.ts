
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Input, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { GeolocationPosition, Plugins, CallbackID } from '@capacitor/core';
import * as leaflet from 'leaflet';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'firebase';
import { AvailableStatus } from '../../models/available-status/available-status.model';
import { AvailableStatusService } from '../../services/available-status/available-status.service';


const { Geolocation } = Plugins;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() position: EventEmitter<GeolocationPosition>;
  @Output() availableStatus: EventEmitter<boolean>;
  @Input() account: User;

  agentsStatusWithinRadius: AvailableStatus[];
  isOnline: boolean;

  watchId: CallbackID;

  @ViewChild('map') mapContainer: ElementRef;
  map: leaflet.Map;

  constructor(private availableStatusService: AvailableStatusService, private zone: NgZone) {
    this.position = new EventEmitter<GeolocationPosition>();
    this.availableStatus = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.availableStatusService.getAvailableAgentsWithinRadius().pipe(takeUntil(this.destroy$)).subscribe(agentsStatus => {
      const userAccount = agentsStatus.find(s => s.uid === this.account.uid);
      userAccount ? this.isOnline = true : this.isOnline = false;

      this.agentsStatusWithinRadius = agentsStatus;
      console.log(agentsStatus);
    });

    setInterval(() => {
      this.isOnline ? this.availableStatus.emit(true) : this.availableStatus.emit(false);
    });
  }

  ngAfterViewInit() {
    this.initializeMap();
    // this.watchCurrentPosition();
    this.watchPosition();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initializeMap() {
    this.map = leaflet.map('map');
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Cybotech Coorp',
    }).addTo(this.map);
  }

  // loadMakers() {
  //   this.agentsStatusWithinRadius.forEach(status => {
  //     this.addMarker(status);
  //   });
  //   console.log(this.agentsStatusWithinRadius);
  // }

  // addMarker(status: AvailableStatus) {
  //   const markerGroup = leaflet.featureGroup();
  //   const marker: any = leaflet.marker([status.position.latitude, status.position.longitude]);

  //   markerGroup.addLayer(marker)
  //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //     .openPopup();

  //   this.map.addLayer(markerGroup);
  // }

  // async getCurrentPosition() {
  //   try {
  //     const position = await Plugins.Geolocation.getCurrentPosition();
  //     console.log('Current', position);
  //     this.zone.run(() => {
  //       if (this.map) {
  //         this.map.setView([position.coords.latitude, position.coords.longitude], 20);
  //       }
  //       this.position.emit(position);
  //     });
  //   } catch (e) {
  //     alert('WebView geo error');
  //     console.error(e);
  //   }
  // }

  watchPosition() {
    try {
      this.watchId = Plugins.Geolocation.watchPosition({}, (position, err) => {
        console.log('Watch', position);
        this.zone.run(() => {
          const watchCoords = position.coords;

          if (this.map) {
            this.map.setView([position.coords.latitude, position.coords.longitude], 20);
          }
          this.position.emit(position);


          console.log(watchCoords);
        });
      });

      console.log('Got watch', this.watchId);
    } catch (e) {
      alert('WebView geo error');
      console.error(e);
    }
  }

  clearWatch() {
    if (this.watchId != null) {
      Plugins.Geolocation.clearWatch({ id: this.watchId });
    }
  }

  async watchCurrentPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      console.log(position, err);

      if (this.map) {
        this.map.setView([position.coords.latitude, position.coords.longitude], 20);
      }

      // if (this.isOnline) {
        this.position.emit(position);

        // this.loadMakers();
      // }

    });
  }

}
