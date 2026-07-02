import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { PaginationComponent } from '../../shared/components/pagination/pagination';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type:
    | 'message'
    | 'product'
    | 'sale'
    | 'favorite'
    | 'system';
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, PaginationComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class NotificationsComponent {
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nuevo mensaje',
      message: 'Juan Pérez te ha enviado un mensaje.',
      date: 'Hace 3 minutos',
      read: false,
      type: 'message'
    },
    {
      id: 2,
      title: 'Producto publicado',
      message: 'Tu LEGO Star Wars ya está publicado.',
      date: 'Hace 20 minutos',
      read: false,
      type: 'product'
    },
    {
      id: 3,
      title: 'Producto vendido',
      message: 'Has vendido una Nintendo Switch.',
      date: 'Hace 1 hora',
      read: false,
      type: 'sale'
    },
    {
      id: 4,
      title: 'Nuevo favorito',
      message: 'Alguien ha añadido tu producto a favoritos.',
      date: 'Ayer',
      read: true,
      type: 'favorite'
    },
    {
      id: 5,
      title: 'Bienvenido',
      message: 'Gracias por registrarte en ToyBox.',
      date: 'Hace 2 días',
      read: true,
      type: 'system'
    },
    {
      id: 6,
      title: 'Nuevo mensaje',
      message: 'María te ha escrito sobre tu producto.',
      date: 'Hace 3 días',
      read: true,
      type: 'message'
    }
  ];

  constructor() {
    this.updatePagination();
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  get paginatedNotifications(): Notification[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.notifications.slice(start, start + this.pageSize);
  }

  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.notifications.length / this.pageSize));
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
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