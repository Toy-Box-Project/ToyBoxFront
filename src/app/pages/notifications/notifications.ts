import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService, AppNotification } from '../../core/services/notifications.service';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'message' | 'product' | 'sale' | 'favorite' | 'system';
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationsService.getAll().subscribe({
      next: (data: AppNotification[]) => {
        this.notifications = data.map(n => this.toLocalNotification(n));
      },
      error: (err) => {
        console.error('Error cargando notificaciones:', err);
      }
    });
  }

  private toLocalNotification(n: AppNotification): Notification {
    return {
      id: n.id_notifications,
      title: this.getTitleFromMessage(n.message),
      message: n.message,
      date: this.formatDate(n.created_at),
      read: n.read,
      type: this.inferType(n.message),
    };
  }

  /** El back solo guarda "message", deducimos un título corto a partir del contenido */
  private getTitleFromMessage(message: string): string {
    if (message.includes('mensaje')) return 'Nuevo mensaje';
    if (message.includes('vendido')) return 'Producto vendido';
    if (message.includes('publicado')) return 'Producto publicado';
    if (message.includes('favoritos')) return 'Nuevo favorito';
    if (message.includes('denunciado')) return 'Artículo denunciado';
    if (message.includes('eliminado')) return 'Artículo eliminado';
    if (message.includes('reactivado')) return 'Artículo reactivado';
    if (message.includes('suspendida')) return 'Cuenta suspendida';
    return 'Notificación';
  }

  private inferType(message: string): Notification['type'] {
    if (message.includes('mensaje')) return 'message';
    if (message.includes('vendido')) return 'sale';
    if (message.includes('publicado')) return 'product';
    if (message.includes('favoritos')) return 'favorite';
    return 'system';
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  }

  markAsRead(notification: Notification): void {
    if (notification.read) return;
    this.notificationsService.markAsRead(notification.id).subscribe({
      next: () => {
        notification.read = true;
      },
      error: (err) => console.error('Error marcando como leída:', err)
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getIcon(type: Notification['type']): string {
    switch (type) {
      case 'message':
        return 'chat';
      case 'product':
        return 'inventory_2';
      case 'sale':
        return 'shopping_bag';
      case 'favorite':
        return 'favorite';
      default:
        return 'notifications';
    }
  }
}