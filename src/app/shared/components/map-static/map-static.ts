import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map-static',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-static.html',
  styleUrl: './map-static.css'
})
export class MapStaticComponent {
  @Input() location: string = '';
  @Input() zoom: number = 13;
  @Input() width: number = 600;
  @Input() height: number = 250;

  constructor(private sanitizer: DomSanitizer) {}

  get mapUrl(): SafeResourceUrl {
    if (!this.location) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    const encodedLocation = encodeURIComponent(this.location);
    const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/auto/auto/${this.width}x${this.height}@2x?access_token=${environment.mapboxToken}`;

    // Using OpenStreetMap Nominatim and StaticMap as fallback
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${this.getMapBounds()}&layer=mapnik&marker=${this.getMapMarker()}`
    );
  }

  private getMapBounds(): string {
    // Default bounds for Spain
    return '-9.3,35.9,3.3,43.8';
  }

  private getMapMarker(): string {
    // Default marker in center of Spain
    return '40.46,-3.75';
  }

  get showError(): boolean {
    return !this.location || this.location.trim() === '';
  }
}
