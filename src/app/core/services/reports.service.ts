import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Report } from '../../shared/interfaces/report.interface';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly API = `${environment.apiUrl}/admin/reports`;

  constructor(private http: HttpClient) {}

  getPending(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  getById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.API}/${id}`);
  }

  approve(productId: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${productId}/approve`, {});
  }

  withdraw(productId: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${productId}/withdraw`, {});
  }
}
