import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface NotificationItem {
  id_notifications: number;
  title?: string | null;
  message: string;
  type?: string | null;
  read: boolean;
  fk_users_id: number;
  created_at: string;

  // solo para frontend
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/notifications`;

  getAll(): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(this.apiUrl);
  }

  getUnreadCount(): Observable<{ unreadCount: number }> {
    return this.http.get<{ unreadCount: number }>(`${this.apiUrl}/unread-count`);
  }

  markAsRead(id: number): Observable<{ updated: number }> {
    return this.http.patch<{ updated: number }>(`${this.apiUrl}/${id}/read`, {});
  }

  markAllAsRead(): Observable<{ updated: number }> {
    return this.http.patch<{ updated: number }>(`${this.apiUrl}/read-all`, {});
  }
}