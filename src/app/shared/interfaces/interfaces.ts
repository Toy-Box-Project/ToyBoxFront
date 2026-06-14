export type Fecha = string;

export type RolUsuario =
  | "user"
  | "moderator"
  | "administrator";

export type EstadoUsuario =
  | "active"
  | "blocked";

export type EstadoConservacion =
  | "draft"
  | "published"
  | "under_review"
  | "removed"
  | "sold";

export type EstadoArticulo =
  | "available"
  | "sold"
  | "paused"
  | "deleted";

export type EstadoIntercambio =
  | "pending"
  | "done"
  | "cancelled";

export type EstadoReporte =
  | "pending"
  | "resolved";

export type DecisionModeracion =
  | "reactivated"
  | "removed";

export type TipoNotificacion =
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
  role: RolUsuario;
  status: EstadoUsuario;
  registration_date: Fecha;
  user_birthday: Fecha;
  user_city: string;
  user_province: string;
  user_zipcode: string;
}

export interface Item {
  id_items: number;
  title: string;
  description: string | null;
  price: number;
  conservation_status: EstadoConservacion;
  location: string | null;
  publication_date: Fecha;
  fk_seller_id: number;
  fk_categories_id: number;
  item_update: Fecha | null;
  item_status: EstadoArticulo | null;
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
  sent_date: Fecha;
  read: boolean;
  fk_users_id_sent: number;
  fk_users_id_received: number;
  fk_conversations_id: number;
}

export interface Report {
  id_reports: number;
  reason: string;
  status: EstadoReporte;
  report_date: Fecha;
  resolution_date: Fecha | null;
  fk_items_id: number;
  fk_user_reported: number;
  fk_user_reports_received: number;
  fk_moderator_id: number;
}

export interface ModerationAction {
  id_action: number;
  decision: DecisionModeracion;
  notification_sent: boolean;
  action_date: Fecha;
  fk_moderator_id: number;
  fk_reports_id: number;
}

export interface ItemHistory {
  id_item_history: number;
  final_price: number;
  trade_status: EstadoIntercambio;
  trade_date: Fecha;
  fk_items_id: number;
  fk_buyer_id: number;
}

export interface Review {
  id_reviews: number;
  rating: number;
  comment: string | null;
  review_date: Fecha;
  fk_items_id: number;
  fk_reviewer_id: number;
  fk_reviewed_id: number;
}

export interface Favorite {
  id_favorite: number;
  saved_date: Fecha;
  fk_users_id: number;
  fk_items_id: number;
}

export interface Notification {
  id_notifications: number;
  notification_type: TipoNotificacion;
  content: string;
  read: boolean;
  notification_date: Fecha;
  fk_users_id: number;
}

export interface Conversation {
  id_conversations: number;
  started_date: Fecha;
  fk_items_id: number;
  fk_seller_id: number;
  fk_buyer_id: number;
}

export interface ItemView {
  id_items_view: number;
  view_date: Fecha;
  fk_items_id: number;
  fk_users_id: number;
}