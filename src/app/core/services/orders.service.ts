import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../../shared/interfaces/order.interface';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly API = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getMyPurchases(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API}/purchases`);
  }

  getMySales(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API}/sales`);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API}/${id}`);
  }
}
