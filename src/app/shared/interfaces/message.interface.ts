export interface ChatMessage {
  id_messages: number;
  content: string;
  sent_date: Date; // change
  read: boolean;
  fk_users_id_sent: number;
  fk_users_id_received: number;
  fk_conversations_id: number;
}

/** Enriched message (used by chat-bubble component) */
export interface ChatMessageWithSender extends ChatMessage {
  senderName: string;
  senderAvatar: string | null;
  senderRole: 'user' | 'moderator' | 'administrator';
}

/** Conversation between seller and buyer */
export interface Chat {
  id_conversations: number;
  started_date: Date;
  fk_items_id: number;
  fk_seller_id: number;
  fk_buyer_id: number;
}

/** DTO to create a message */
export interface CreateMessageDTO {
  content: string;
  fk_conversations_id: number;
}

/** DTO to mark as read */
export interface UpdateMessageReadDTO {
  read: boolean;
}