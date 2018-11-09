import { Status } from './../../models/status/status.model';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { GeolocationPosition, Plugins } from '@capacitor/core';
import * as leaflet from 'leaflet';


const { Geolocation } = Plugins;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @Output() position: EventEmitter<GeolocationPosition>;

  @Input() agentsStatusWithinRadius: Status[];
  @Input() isOnline: boolean;

  @ViewChild('map') mapContainer: ElementRef;
  map: leaflet.Map;

  constructor() {
    this.position = new EventEmitter<GeolocationPosition>();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initializeMap();
    this.watchCurrentPosition();
  }

  initializeMap() {
    // this.map = leaflet.map('map').setView([position.coords.latitude, position.coords.longitude], 16);
    this.map = leaflet.map('map');
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Cybotech Coorp',
    }).addTo(this.map);

    // this.loadMakers();
  }

  loadMakers() {
    this.agentsStatusWithinRadius.forEach(status => {
      this.addMarker(status);
    });
    console.log(this.agentsStatusWithinRadius);
  }

  addMarker(status: Status) {
    const markerGroup = leaflet.featureGroup();
    const marker: any = leaflet.marker([status.position.latitude, status.position.longitude]);

    markerGroup.addLayer(marker)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    this.map.addLayer(markerGroup);
  }

  async watchCurrentPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      console.log(position, err);

      if (this.map) {
        this.map.setView([position.coords.latitude, position.coords.longitude], 20);
      }

      // if (this.isOnline) {
        this.position.emit(position);
        this.loadMakers();
      // }

    });
  }

}
