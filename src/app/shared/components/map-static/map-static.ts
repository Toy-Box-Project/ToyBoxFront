import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map-static',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-static.html',
  styleUrl: './map-static.css'
})

export class MapStaticComponent implements OnChanges {

  @Input() location: string = '';
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() zoom: number = 14;
  @Input() width: number | string = '100%';
  @Input() height: number | string = 300;

  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['latitude'] || changes['longitude'] || changes['location']) {
      console.log('✅ map-static: ngOnChanges() detectó cambio en coordenadas', {
        latitude: this.latitude,
        longitude: this.longitude,
        location: this.location,
        esValido: this.hasValidCoordinates(),

        cambios: {
          latitud: changes['latitude']?.currentValue,
          longitud: changes['longitude']?.currentValue,
        }
      });
    }
  }

  get mapUrl(): SafeResourceUrl {
    if (!this.hasValidCoordinates() && !this.location) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    if (this.hasValidCoordinates()) {
      const markerCoords = `${this.latitude},${this.longitude}`;
      const bbox = this.calculateBbox(this.latitude!, this.longitude!);
      
      const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${markerCoords}`;
      
      console.log('🗺️ map-static: URL generada para iframe:', url);
      console.log('📍 map-static: Marcador en:', { lat: this.latitude, lng: this.longitude });
      
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  private hasValidCoordinates(): boolean {
    return (
      this.latitude !== null &&
      this.latitude !== undefined &&
      this.longitude !== null &&
      this.longitude !== undefined &&
      !isNaN(this.latitude) &&
      !isNaN(this.longitude)
    );
  }

  private calculateBbox(lat: number, lng: number): string {
    const offset = 0.05;
    const south = (lat - offset).toFixed(4);
    const west = (lng - offset).toFixed(4);
    const north = (lat + offset).toFixed(4);
    const east = (lng + offset).toFixed(4);
    return `${west},${south},${east},${north}`;
  }

  get locationDisplay(): string {
    if (this.location) {
      return this.location;
    }
    if (this.hasValidCoordinates()) {
      return `${this.latitude?.toFixed(4)}, ${this.longitude?.toFixed(4)}`;
    }
    return '';
  }

  get showError(): boolean {
    return !this.hasValidCoordinates() && (!this.location || this.location.trim() === '');
  }

  get showMap(): boolean {
    return this.hasValidCoordinates() || this.location.trim() !== '';
  }
}