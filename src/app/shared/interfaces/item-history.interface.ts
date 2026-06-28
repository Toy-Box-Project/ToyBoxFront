import { DateString, UserSummary } from './user.interface';
import { TradeStatus } from '../enums/trade-status.enum';
import { Item } from './item.interface';

export interface ItemHistory {
  id_item_history: number;
  final_price: number; 
  trade_status: TradeStatus; 
  trade_date: DateString; 
  fk_items_id: number;
  fk_buyer_id: number;
  fk_seller_id: number; 

  // Optionals
  item?: Item; 
  buyer?: UserSummary; 
  seller?: UserSummary; 
}

export interface Purchase extends ItemHistory {
  seller: UserSummary; 
  item: Item;
}

export interface Sale extends ItemHistory {
  buyer: UserSummary; 
  item: Item; 
}

export interface PurchaseFormData {
  fk_items_id: number;
  fk_buyer_id: number;
  final_price: number;
}