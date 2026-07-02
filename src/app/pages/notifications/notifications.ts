import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { NotificationsService, NotificationItem } from '../../core/services/notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, PaginationComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class NotificationsComponent implements OnInit {
  private readonly notificationsService = inject(NotificationsService);
  private readonly cdr = inject(ChangeDetectorRef);

  notifications: NotificationItem[] = [];
  unreadCount = 0;

  isLoading = true;
  backendError = '';

  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.isLoading = true;
    this.backendError = '';

    this.notificationsService.getAll().subscribe({
      next: (data) => {
        this.notifications = data.map((notification) => ({
          ...notification,
          date: this.formatDate(notification.created_at)
        }));

        this.unreadCount = this.notifications.filter(n => !n.read).length;
        this.updatePagination();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.handleError(err, 'Error al cargar las notificaciones');
        console.error('Error cargando notificaciones:', err);
        this.cdr.markForCheck();
      }
    });
  }

  markAsRead(notification: NotificationItem): void {
    if (notification.read) return;

    this.notificationsService.markAsRead(notification.id_notifications).subscribe({
      next: () => {
        notification.read = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error marcando notificación como leída:', err);
      }
    });
  }

  markAllAsRead(): void {
    if (!this.unreadCount) return;

    this.notificationsService.markAllAsRead().subscribe({
      next: () => {
        this.notifications = this.notifications.map(notification => ({
          ...notification,
          read: true
        }));
        this.unreadCount = 0;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error marcando todas como leídas:', err);
      }
    });
  }

  get paginatedNotifications(): NotificationItem[] {
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

  getIcon(type?: string | null): string {
    switch (type) {
      case 'message':
        return 'mail';
      case 'favorite':
        return 'favorite';
      case 'purchase':
        return 'shopping_bag';
      case 'sale':
        return 'sell';
      case 'review':
        return 'star';
      case 'warning':
        return 'warning';
      default:
        return 'notifications';
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  private handleError(err: HttpErrorResponse, defaultMessage: string): void {
    if (err.status === 401) {
      this.backendError = 'Debes iniciar sesión para ver tus notificaciones';
    } else if (err.status === 0) {
      this.backendError = 'Error de conexión. Verifica que el servidor esté corriendo';
    } else {
      this.backendError = err.error?.error || defaultMessage;
    }
  }
}