import { DateString } from './user.interface';

export type ReportStatus =
  | 'pending'
  | 'resolved';

export type ModerationDecision =
  | 'reactivated'
  | 'removed';

export interface Report {
  id_reports: number;
  reason: string;
  status: ReportStatus;
  report_date: DateString;
  resolution_date: DateString | null;
  fk_items_id: number;
  fk_user_reported: number;
  fk_user_reports_received: number;
  fk_moderator_id: number;
}

export interface ModerationAction {
  id_action: number;
  decision: ModerationDecision;
  notification_sent: boolean;
  action_date: DateString;
  fk_moderator_id: number;
  fk_reports_id: number;
}
