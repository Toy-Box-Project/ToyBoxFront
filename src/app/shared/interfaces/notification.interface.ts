import { DateString } from './user.interface';
import { NotificationType } from '../enums/notification-type.enum';

export interface Notification {
  id_notifications: number;
  notification_type: NotificationType;
  content: string;
  read: boolean;
  notification_date: DateString;
  fk_users_id: number;

  // Optionals
  relatedItemId?: number;
  relatedUserId?: number;
  actionUrl?: string;
}

export interface NotificationItem {
  id_notifications: number;
  type: NotificationType;
  title: string;
  preview: string;
  read: boolean;
  notification_date: DateString;
  actionUrl?: string;
}

export interface NotificationFormData {
  notification_type: NotificationType;
  content: string;
  fk_users_id: number;
  relatedItemId?: number;
  relatedUserId?: number;
}