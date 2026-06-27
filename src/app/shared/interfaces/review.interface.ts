import { DateString, UserSummary } from './user.interface';

export interface Review {
  id_reviews: number;
  rating: number;
  comment: string | null;
  review_date: DateString;
  fk_items_id: number;
  fk_reviewer_id: number;
  fk_reviewed_id: number;

  // optionals
  reviewer?: UserSummary;
  reviewed?: UserSummary;
}

export interface CreateReviewRequest {
  rating: number;
  comment?: string | null;
  fk_items_id: number;
  fk_reviewed_id: number;
}
