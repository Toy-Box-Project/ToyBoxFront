import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reservation } from '../../shared/interfaces/reservation.interface';

@Injectable({ providedIn: 'root' })
export class ReservationsService {
  private readonly API = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) {}

  create(productId: number): Observable<Reservation> {
    return this.http.post<Reservation>(this.API, { fk_product_id: productId });
  }

  cancel(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${id}/cancel`, {});
  }

  complete(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${id}/complete`, {});
  }

  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.API}/my`);
  }
}
