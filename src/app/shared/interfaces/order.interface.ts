import { DateString } from './user.interface';

export type TradeStatus =
  | 'pending'
  | 'done'
  | 'cancelled';

export interface Order {
  id_item_history: number;
  final_price: number;
  trade_status: TradeStatus;
  trade_date: DateString;
  fk_items_id: number;
  fk_buyer_id: number;
}
