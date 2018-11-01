import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import * as leaflet from 'leaflet';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('map') mapContainer: ElementRef;
  map: leaflet.Map;

  constructor(private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter() {
    if (!this.map) {
      this.getCurrentPosition();
    }

  }

  async getCurrentPosition() {
    Geolocation.getCurrentPosition().then(coords => {

      this.map = leaflet.map('map').setView([coords.coords.latitude, coords.coords.longitude], 15);
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'Cybotech Coorp',
      }).addTo(this.map);

      const markerGroup = leaflet.featureGroup();
      const marker: any = leaflet.marker([coords.coords.latitude, coords.coords.longitude]);

      markerGroup.addLayer(marker)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      this.map.addLayer(markerGroup);
    });
  }

  navigateToProfilePage() {
    this.router.navigate(['profile']);
  }

}
