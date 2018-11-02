import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @ViewChild('map') mapContainer: ElementRef;
  map: leaflet.Map;

  constructor() {
    this.position = new EventEmitter<GeolocationPosition>();
  }

  ngOnInit() { }

  // ionViewDidEnter() {
  //   if (!this.map) {
  //     this.getCurrentPosition();
  //   }
  // }

  ngAfterViewInit() {
    // if (!this.map) {
      this.getCurrentPosition();
    // }
  }

  initializeMap(position: GeolocationPosition) {
    this.map = leaflet.map('map').setView([position.coords.latitude, position.coords.longitude], 16);
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Cybotech Coorp',
    }).addTo(this.map);
  }

  addMarker(position: GeolocationPosition) {
    const markerGroup = leaflet.featureGroup();
    const marker: any = leaflet.marker([position.coords.latitude, position.coords.longitude]);

    markerGroup.addLayer(marker)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    this.map.addLayer(markerGroup);
  }

  async getCurrentPosition() {
    this.map = null;

    const position = await Geolocation.getCurrentPosition();

    this.initializeMap(position);
    this.addMarker(position);

    this.position.emit(position);
  }

}
