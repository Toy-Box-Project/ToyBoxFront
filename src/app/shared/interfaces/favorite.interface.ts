import { Item } from './item.interface';
import { DateString, UserSummary } from './user.interface';

export interface Favorite {
  id_favorite: number;
  saved_date: DateString;
  fk_users_id: number;
  fk_items_id: number;

  // optionals
  item?: Item;
  user?: UserSummary;
}
