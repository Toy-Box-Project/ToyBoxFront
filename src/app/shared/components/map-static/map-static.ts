import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map-static',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-static.html',
  styleUrl: './map-static.css',
})
export class MapStaticComponent implements OnChanges {

  @Input() location: string = '';   
  @Input() zoom: number = 13;
  @Input() width: number = 600;
  @Input() height: number = 300;

  showModal = false;

  private apiKey = 'pk.d6f114cfcc152a5df36d419add2a69e9'; 


  mapUrl: string = ''; 

  async ngOnInit() {
    if (this.location) {
      this.mapUrl = await this.generateMap(this.location);
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      const url = await this.generateMap(this.location);
      this.mapUrl = url; 
    }
  }

  openModal() {
    if (this.mapUrl) {
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  async getCoordinates(location: string): Promise<{ lat: number, lon: number } | null> {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location + ', España ')}`;

      const res = await fetch(url, {
        headers: {
          'User-Agent': 'ToyBoxApp/1.0 (contacto@toybox.com)'
        }
      });

      const data = await res.json();
      if (data.length === 0) return null;

      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } catch {
      return null;
    }
  }

  async generateMap(location: string): Promise<string> {
    const coords = await this.getCoordinates(location);

    if (!coords) {
    return `https://maps.wikimedia.org/img/osm-intl,${this.zoom},40.4168,-3.7038,${this.width}x${this.height}.png`;
    }



    const { lat, lon } = coords;

    return (
      `https://maps.locationiq.com/v3/staticmap?` +
      `key=${this.apiKey}` +
      `&center=${lat},${lon}` +
      `&zoom=${this.zoom}` +
      `&size=${this.width}x${this.height}` +
      `&markers=icon:large-red-cutout|${lat},${lon}`
    );
  }
}