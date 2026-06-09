

export type Fecha = string;

export type RolUsuario = string;
export type EstadoUsuario = string;
export type EstadoArticulo = string;
export type EstadoConservacion = string;
export type EstadoIntercambio = string;
export type EstadoReporte = string;
export type TipoNotificacion = string;
export type DecisionModeracion = string;



export interface Category {
  id_categories: number;
  name: string;
  description: string;
}



export interface User {
  id_users: number;
  username: string;
  email: string;
  password: string;
  profile_picture: string;
  role: RolUsuario;
  status: EstadoUsuario;
  registration_date: Fecha;
  user_birthday: Fecha;
  user_city: string;
  user_province: string;
  user_zipcode: string;
}



export interface Item {
  id_articles: number;
  title: string;
  description: string;
  price: number;
  conservation_status: EstadoConservacion;
  location: string;
  publication_date: Fecha;
  fk_seller_id: number;
  fk_categories_id: number;
  item_update: Fecha;
}



export interface ItemHistory {
  id_item_history: number;
  final_price: number;
  trade_status: EstadoIntercambio;
  trade_date: Fecha;
  fk_items_id_articles: number;
}



export interface ItemView {
  id_items_view: number;
  view_date: Fecha;
  fk_items_id: number;
  fk_users_id: number;
}



export interface ItemPhoto {
  id_photos: number;
  photo_url: string;
  order: number;
  fk_items_id: number;
  fk_users_id: number;
  fk_categories_id: number;
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



export interface Message {
  id_messages: number;
  content: string;
  sent_date: Fecha;
  read: boolean;
  fk_items_id_messages: number;
  items_categories_id_categories: number;
  fk_users_id_sent: number;
  fk_users_id_received: number;
  fk_conversations_id: number;
  fk_items_id: number;
}



export interface Review {
  id_reviews: number;
  rating: number;
  comment: string;
  review_date: Fecha;
  fk_items_id: number;
  fk_reviewer_id: number;
  fk_reviewed_id: number;
}



export interface Report {
  id_reports: number;
  reason: string;
  status: EstadoReporte;
  report_date: Fecha;
  resolution_date: Fecha;
  fk_items_id: number;
  items_categories_id_categories: number;
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