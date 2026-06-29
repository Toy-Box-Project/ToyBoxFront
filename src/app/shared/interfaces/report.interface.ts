import { DateString, User, UserSummary } from './user.interface';
import { ReportStatus } from '../enums/report-status.enum';
import { ModerationDecision } from '../enums/moderation-decision.enum';
import { Item } from './item.interface';

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

  //optionals
  item?: Item;
  reportedUser?: UserSummary;
  moderator?: UserSummary;
}

export interface ReportItem {
  id_reports: number;
  itemTitle: string;
  reporter: string;
  reportedUser: string;
  reason: string;
  status: ReportStatus;
  date: DateString;
}

export interface ReportDetail extends Report {
  item: Item;
  reporterUser: User;
  reportedUserDetails: User;
}

export interface ReportFormData {
  reason: string;
  fk_items_id: number;
  fk_user_reported: number;
}

export interface ModerationAction {
  id_action: number;
  decision: ModerationDecision;
  notification_sent: boolean;
  action_date: DateString;
  fk_moderator_id: number;
  fk_reports_id: number;

  // Optionals
  moderator?: UserSummary;
  report?: Report;
}
