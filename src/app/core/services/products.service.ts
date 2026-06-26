import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateProductRequest, PaginatedProducts, Product, ProductFilters
} from '../../shared/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly API = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(filters: ProductFilters = {}): Observable<PaginatedProducts> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => { if (v !== undefined) params = params.set(k, String(v)); });
    return this.http.get<PaginatedProducts>(this.API, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  create(body: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>(this.API, body);
  }

  update(id: number, body: Partial<CreateProductRequest>): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${id}`, body);
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

  publish(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.API}/${id}/publish`, {});
  }

  markAsSold(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.API}/${id}/sold`, {});
  }
}
