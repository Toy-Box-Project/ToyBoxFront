import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Favorite } from '../../shared/interfaces/favorite.interface';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly API = `${environment.apiUrl}/favorites`;

  constructor(private http: HttpClient) {}

  getMyFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.API);
  }

  add(productId: number): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.API}/${productId}`, {});
  }

  remove(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${productId}`);
  }
}
