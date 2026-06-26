import { DateString } from './user.interface';

export type ReservationStatus =
  | 'pending'
  | 'completed'
  | 'cancelled';

export interface Reservation {
  id_reservation: number;
  reservation_status: ReservationStatus;
  reservation_date: DateString;
  expiration_date: DateString | null;
  fk_items_id: number;
  fk_buyer_id: number;
}
