import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// Ensure LeafletModule is imported either here (if standalone)
// or in the NgModule that declares this component.

@Component({
  selector: 'app-mapa-simple',
  // No 'imports' needed here if it's NOT standalone
  template: `
    <div style="height: 100%; width: 100%; border: 2px solid blue;">
      <div class="map-frame"
           leaflet
           (leafletMapReady)="onMapReady($event)"
           [leafletOptions]="options">
      </div>
    </div>
  `,
  styles: [`
    .map-frame {
      height: 100%;
      width: 100%;
      background: #eee; /* Background to see if the div has size */
    }
    /* Aggressive CSS Rescue for Leaflet inside modal */
    :host ::ng-deep .leaflet-container img { max-width: none !important; }
    :host ::ng-deep .leaflet-tile { width: 256px !important; height: 256px !important; }
    :host ::ng-deep .leaflet-tile-container { width: 100% !important; height: 100% !important; }
    :host ::ng-deep {
        /* Asegúrate que el selector apunte al contenedor del mapa */
        .map-frame .leaflet-container img.leaflet-tile {
          max-width: none !important;
          width: 256px !important;
          height: 256px !important;
          display: block !important; /* Asegura que sea visible */
          visibility: visible !important;
          opacity: 1 !important;
          box-sizing: content-box !important;
        }
      }
  `]
})
export class MapaSimpleComponent implements OnInit {
  map: L.Map | undefined;
  options: L.MapOptions = {
    zoom: 6,
    center: L.latLng(-9.189967, -75.015152), // Centered on Peru
    // Layers will be added in onMapReady
  };

  constructor() { }

  ngOnInit(): void { }

  /**
   * Called once when the Leaflet map is initialized.
   */
  onMapReady(map: L.Map) {
    console.log('PRUEBA AGRESIVA: onMapReady triggered');
    this.map = map;

    // Add the base map tile layer manually
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // --- AGGRESSIVE INVALIDATESIZE SEQUENCE ---
    console.log('PRUEBA AGRESIVA: Starting invalidateSize sequence...');

    // Attempt 1: Immediately (might read incorrect size)
    try {
      this.map?.invalidateSize();
      console.log('PRUEBA AGRESIVA: invalidateSize (immediate) - OK');
    } catch (e) {
      console.error('PRUEBA AGRESIVA: invalidateSize (immediate) - FAILED', e);
    }

    // Attempt 2: After a short delay (100ms)
    setTimeout(() => {
      console.log('PRUEBA AGRESIVA: invalidateSize (100ms)');
      try {
        this.map?.invalidateSize();
        console.log('PRUEBA AGRESIVA: invalidateSize (100ms) - OK');
      } catch (e) {
        console.error('PRUEBA AGRESIVA: invalidateSize (100ms) - FAILED', e);
      }
    }, 100);

    // Attempt 3: After modal should be stable (400ms)
    setTimeout(() => {
      console.log('PRUEBA AGRESIVA: invalidateSize (400ms)');
      try {
        this.map?.invalidateSize();
        console.log('PRUEBA AGRESIVA: invalidateSize (400ms) - OK');
      } catch (e) {
        console.error('PRUEBA AGRESIVA: invalidateSize (400ms) - FAILED', e);
      }
    }, 400);

    // Attempt 4: Long after everything should be settled (1000ms)
    setTimeout(() => {
      console.log('PRUEBA AGRESIVA: invalidateSize FINAL (1000ms)');
      try {
        this.map?.invalidateSize();
        console.log('PRUEBA AGRESIVA: invalidateSize FINAL (1000ms) - OK');
        console.log('PRUEBA AGRESIVA: Sequence finished.');
        // Optional: Center the map here if tiles are now correct
        // this.map?.setView([-9.18, -75.01], 6);
      } catch (e) {
        console.error('PRUEBA AGRESIVA: invalidateSize FINAL (1000ms) - FAILED', e);
      }
    }, 1000); // 1 second delay
  }
}