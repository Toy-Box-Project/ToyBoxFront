import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class NotificationsComponent {

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
    }
  ];

  markAsRead(notification: Notification): void {
    notification.read = true;
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