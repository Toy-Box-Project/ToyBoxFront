import { DateString } from './user.interface';

export interface ChatMessage {
  id_messages: number;
  content: string;
  sent_date: DateString;
  read: boolean;
  fk_users_id_sent: number;
  fk_users_id_received: number;
  fk_conversations_id: number;
}
