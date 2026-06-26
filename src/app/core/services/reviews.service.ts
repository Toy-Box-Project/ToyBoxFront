import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateReviewRequest, Review } from '../../shared/interfaces/review.interface';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private readonly API = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getByProduct(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API}/product/${productId}`);
  }

  create(body: CreateReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.API, body);
  }
}
