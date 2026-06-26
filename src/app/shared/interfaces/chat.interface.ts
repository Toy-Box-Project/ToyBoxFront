import { DateString } from './user.interface';

export interface Chat {
  id_conversations: number;
  started_date: DateString;
  fk_items_id: number;
  fk_seller_id: number;
  fk_buyer_id: number;
}
