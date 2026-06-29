import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm';
import { ToastComponent, ToastType } from '../../../shared/components/toast/toast';
import { FooterComponent } from "../../../shared/components/footer/footer";
import { NavbarComponent } from "../../../shared/components/navbar/navbar";

type ReportAction = 'resolve' | 'withdraw' | 'reactivate';

// DEMO - use interface ReportDetail
interface ReportDetail {
  id: number;
  itemTitle: string;
  itemDescription: string;
  reporter: string;
  reportedUser: string;
  reason: string;
  status: 'pending' | 'resolved';
  reportDate: string;
}

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalConfirmComponent, ToastComponent, FooterComponent, NavbarComponent],
  templateUrl: './report-detail.html',
  styleUrl: './report-detail.css'
})
export class ReportDetailComponent {
  private readonly route = inject(ActivatedRoute);

  report: ReportDetail = {
    id: Number(this.route.snapshot.paramMap.get('id')) || 101,
    itemTitle: 'Vintage console',
    itemDescription: 'Second-hand console listed as new. Buyer reports scratches and missing controller.',
    reporter: 'ana_user',
    reportedUser: 'seller_82',
    reason: 'Misleading product condition',
    status: 'pending',
    reportDate: '2026-06-14',
  };

  pendingAction: ReportAction | null = null;
  toast = { visible: false, type: 'success' as ToastType, title: '', message: '' };

  get modalTitle(): string {
    return this.pendingAction === 'withdraw'
      ? 'Withdraw item'
      : this.pendingAction === 'reactivate'
        ? 'Reactivate item'
        : 'Resolve report';
  }

  get modalMessage(): string {
    return this.pendingAction === 'withdraw'
      ? 'The reported item will be removed from the catalog.'
      : this.pendingAction === 'reactivate'
        ? 'The item will remain visible in the catalog.'
        : 'The report will be marked as resolved.';
  }

  openAction(action: ReportAction): void {
    this.pendingAction = action;
  }

  confirmAction(): void {
    if (!this.pendingAction) {
      return;
    }

    this.report = { ...this.report, status: 'resolved' };

    const messages: Record<ReportAction, string> = {
      resolve: 'Report marked as resolved.',
      withdraw: 'Item withdrawn and report resolved.',
      reactivate: 'Item reactivated and report resolved.',
    };

    this.toast = {
      visible: true,
      type: 'success',
      title: 'Moderation action completed',
      message: messages[this.pendingAction],
    };
    this.pendingAction = null;
  }
}
