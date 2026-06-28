import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Purchase } from '../../shared/interfaces/item-history.interface';
@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly API = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getMyPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.API}/purchases`);
  }

  getMySales(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.API}/sales`);
  }

  getById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.API}/${id}`);
  }
}
