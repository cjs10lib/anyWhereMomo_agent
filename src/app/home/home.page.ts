import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(private router: Router) { }

  ionViewDidEnter() {
    if (!this.map) {
      this.loadmap();
    }
  }

  loadmap() {
    this.map = leaflet.map('map').fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Cybotech Coorp',
      maxZoom: 20
    }).addTo(this.map);
  }

  navigateToProfilePage() {
    this.router.navigate(['profile']);
  }

}
