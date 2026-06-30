import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface AppNotification {
    id_notifications: number;
    message: string;
    read: boolean;
    created_at: string;
    fk_users_id: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    private readonly API = `${environment.apiUrl}/notifications`;

    private readonly _unreadCount = signal<number>(0);
    readonly unreadCount = this._unreadCount.asReadonly();

    constructor(private http: HttpClient) { }

    getAll(): Observable<AppNotification[]> {
        return this.http.get<AppNotification[]>(this.API);
    }

    refreshUnreadCount(): void {
        this.http.get<{ unreadCount: number }>(`${this.API}/unread-count`).subscribe({
            next: (res) => this._unreadCount.set(res.unreadCount),
            error: (err) => console.error('Error cargando notificaciones:', err)
        });
    }

    markAsRead(id: number): Observable<{ updated: number }> {
        return this.http.patch<{ updated: number }>(`${this.API}/${id}/read`, {}).pipe(
            tap(() => this.refreshUnreadCount())
        );
    }

    markAllAsRead(): Observable<{ updated: number }> {
        return this.http.patch<{ updated: number }>(`${this.API}/read-all`, {}).pipe(
            tap(() => this.refreshUnreadCount())
        );
    }
}