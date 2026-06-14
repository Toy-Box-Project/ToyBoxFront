export type DateString = string;

export type UserRole =
  | "user"
  | "moderator"
  | "administrator";

export type UserStatus =
  | "active"
  | "blocked";

export type ConservationStatus =
  | "draft"
  | "published"
  | "under_review"
  | "removed"
  | "sold";

export type ItemStatus =
  | "available"
  | "sold"
  | "paused"
  | "deleted";

export type TradeStatus =
  | "pending"
  | "done"
  | "cancelled";

export type ReportStatus =
  | "pending"
  | "resolved";

export type ModerationDecision =
  | "reactivated"
  | "removed";

export type NotificationType =
  | "message"
  | "report"
  | "moderation"
  | "system";

export interface Category {
  id_categories: number;
  name: string;
  description: string | null;
}

export interface User {
  id_users: number;
  username: string;
  email: string;
  password: string;
  profile_picture: string | null;
  role: UserRole;
  status: UserStatus;
  registration_date: DateString;
  user_birthday: DateString;
  user_city: string;
  user_province: string;
  user_zipcode: string;
}

export interface Item {
  id_items: number;
  title: string;
  description: string | null;
  price: number;
  conservation_status: ConservationStatus;
  location: string | null;
  publication_date: DateString;
  fk_seller_id: number;
  fk_categories_id: number;
  item_update: DateString | null;
  item_status: ItemStatus | null;
}

export interface ItemPhoto {
  id_photos: number;
  photo_url: string;
  order: number | null;
  fk_items_id: number;
}

export interface Message {
  id_messages: number;
  content: string;
  sent_date: DateString;
  read: boolean;
  fk_users_id_sent: number;
  fk_users_id_received: number;
  fk_conversations_id: number;
}

export interface Report {
  id_reports: number;
  reason: string;
  status: ReportStatus;
  report_date: DateString;
  resolution_date: DateString | null;
  fk_items_id: number;
  fk_user_reported: number;
  fk_user_reports_received: number;
  fk_moderator_id: number;
}

export interface ModerationAction {
  id_action: number;
  decision: ModerationDecision;
  notification_sent: boolean;
  action_date: DateString;
  fk_moderator_id: number;
  fk_reports_id: number;
}

export interface ItemHistory {
  id_item_history: number;
  final_price: number;
  trade_status: TradeStatus;
  trade_date: DateString;
  fk_items_id: number;
  fk_buyer_id: number;
}

export interface Review {
  id_reviews: number;
  rating: number;
  comment: string | null;
  review_date: DateString;
  fk_items_id: number;
  fk_reviewer_id: number;
  fk_reviewed_id: number;
}

export interface Favorite {
  id_favorite: number;
  saved_date: DateString;
  fk_users_id: number;
  fk_items_id: number;
}

export interface Notification {
  id_notifications: number;
  notification_type: NotificationType;
  content: string;
  read: boolean;
  notification_date: DateString;
  fk_users_id: number;
}

export interface Conversation {
  id_conversations: number;
  started_date: DateString;
  fk_items_id: number;
  fk_seller_id: number;
  fk_buyer_id: number;
}

export interface ItemView {
  id_items_view: number;
  view_date: DateString;
  fk_items_id: number;
  fk_users_id: number;
}