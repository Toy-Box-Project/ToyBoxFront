import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface LocationData {
  ciudades: string[];
  codigosPostales: Record<string, string[]>;
}

interface CoordinatesCache {
  [key: string]: { lat: number; lng: number } | null;
}

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private locationsData: Record<string, LocationData> = {};
  private loaded = false;
  private coordinatesCache: CoordinatesCache = {};

  constructor(private http: HttpClient) {
    this.loadLocationsData();
  }

  private loadLocationsData(): void {
    this.http.get<Record<string, LocationData>>('/assets/data/codigos-postales-españa.json')
      .subscribe({
        next: (data) => {
          this.locationsData = data;
          this.loaded = true;
          console.log('✅ Datos de ubicación cargados correctamente');
        },
        error: (error) => {
          console.error('❌ Error cargando datos de ubicación:', error);
          this.loaded = true;
        }
      });
  }

  async getProvincias(): Promise<string[]> {
    await this.ensureLoaded();
    return Object.keys(this.locationsData).sort();
  }

  async getCiudadesByProvincia(provincia: string): Promise<string[]> {
    await this.ensureLoaded();
    return this.locationsData[provincia]?.ciudades?.sort() ?? [];
  }

  async getCodigosPostalesByCity(provincia: string, ciudad: string): Promise<string[]> {
    await this.ensureLoaded();
    const prov = this.locationsData[provincia];
    if (!prov) return [];
    const codigosPostales = prov.codigosPostales as Record<string, string[]>;
    return (codigosPostales[ciudad] ?? []).sort();
  }

  async validarUbicacion(provincia: string, ciudad: string, codigoPostal: string): Promise<{ valido: boolean; error?: string }> {
    await this.ensureLoaded();
    const prov = this.locationsData[provincia];

    if (!prov) {
      return { valido: false, error: 'Provincia no válida' };
    }

    if (!prov.ciudades.includes(ciudad)) {
      return { valido: false, error: `${ciudad} no es una ciudad válida en ${provincia}` };
    }

    const codigosPostales = prov.codigosPostales as Record<string, string[]>;
    const codigosValidos = (codigosPostales[ciudad] ?? []) as string[];
    if (!codigosValidos.includes(codigoPostal)) {
      return { valido: false, error: `${codigoPostal} no es un código postal válido para ${ciudad}, ${provincia}` };
    }

    return { valido: true };
  }

  async findUbicacionByCodigoPostal(codigoPostal: string): Promise<{ provincia: string; ciudad: string } | null> {
    await this.ensureLoaded();
    for (const [provincia, provData] of Object.entries(this.locationsData)) {
      const codigosPostales = provData.codigosPostales as Record<string, string[]>;
      for (const [ciudad, codigos] of Object.entries(codigosPostales)) {
        if (codigos && Array.isArray(codigos) && codigos.includes(codigoPostal)) {
          return { provincia, ciudad };
        }
      }
    }
    return null;
  }

  /**
   * Obtiene las coordenadas geográficas (latitud y longitud) de una ciudad y provincia
   * Utiliza Nominatim API de OpenStreetMap
   * @param provincia Nombre de la provincia
   * @param ciudad Nombre de la ciudad
   * @returns { lat: number; lng: number } | null
   */
  async getCoordinates(provincia: string, ciudad: string): Promise<{ lat: number; lng: number } | null> {
    const cacheKey = `${ciudad}-${provincia}`;

    // Verificar caché
    if (cacheKey in this.coordinatesCache) {
      return this.coordinatesCache[cacheKey];
    }

    try {
      const query = `${ciudad}, ${provincia}, España`;
      const encodedQuery = encodeURIComponent(query);

      // Nominatim API de OpenStreetMap (requiere User-Agent)
      const response = await firstValueFrom(
        this.http.get<any[]>(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}`,
          {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'ToyBox-App/1.0'
            }
          }
        )
      );

      if (response && response.length > 0) {
        const result = {
          lat: parseFloat(response[0].lat),
          lng: parseFloat(response[0].lon)
        };
        // Guardar en caché
        this.coordinatesCache[cacheKey] = result;
        console.log(`✅ Coordenadas obtenidas para ${ciudad}, ${provincia}:`, result);
        return result;
      } else {
        console.warn(`⚠️ No se encontraron coordenadas para ${ciudad}, ${provincia}`);
        this.coordinatesCache[cacheKey] = null;
        return null;
      }
    } catch (error) {
      console.error(`❌ Error obteniendo coordenadas para ${ciudad}, ${provincia}:`, error);
      this.coordinatesCache[cacheKey] = null;
      return null;
    }
  }

  /**
   * Limpia el caché de coordenadas
   */
  clearCoordinatesCache(): void {
    this.coordinatesCache = {};
    console.log('✅ Caché de coordenadas limpiado');
  }

  private async ensureLoaded(): Promise<void> {
    let attempts = 0;
    while (!this.loaded && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
  }
}
