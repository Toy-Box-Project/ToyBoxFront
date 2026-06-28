import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Item, Itemfilters, ItemFormData, PaginatedItems} from '../../shared/interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly API = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(filters: Itemfilters = {}): Observable<PaginatedItems> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => { if (v !== undefined) params = params.set(k, String(v)); });
    return this.http.get<PaginatedItems>(this.API, { params });
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.API}/${id}`);
  }

  create(body: ItemFormData): Observable<Item> {
    return this.http.post<Item>(this.API, body);
  }

  update(id: number, body: Partial<ItemFormData>): Observable<Item> {
    return this.http.put<Item>(`${this.API}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  uploadImages(id: number, files: FormData): Observable<void> {
    return this.http.post<void>(`${this.API}/${id}/images`, files);
  }

  report(id: number, reason: string): Observable<void> {
    return this.http.post<void>(`${this.API}/${id}/report`, { reason });
  }

  publish(id: number): Observable<Item> {
    return this.http.patch<Item>(`${this.API}/${id}/publish`, {});
  }

  markAsSold(id: number): Observable<Item> {
    return this.http.patch<Item>(`${this.API}/${id}/sold`, {});
  }
}
