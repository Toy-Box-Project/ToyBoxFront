import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm';
import { ToastComponent, ToastType } from '../../../shared/components/toast/toast';

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
  imports: [RouterLink, ModalConfirmComponent, ToastComponent],
  templateUrl: './report-detail.html',
  styleUrl: './report-detail.css'
})
export class ReportDetailComponent {
  private readonly route = inject(ActivatedRoute);

  report: ReportDetail = {
    id: Number(this.route.snapshot.paramMap.get('id')) || 101,
    itemTitle: 'Consola vintage',
    itemDescription: 'Consola de segunda mano publicada como nueva. El comprador reporta arañazos y falta de mando.',
    reporter: 'ana_user',
    reportedUser: 'seller_82',
    reason: 'Estado del producto engañoso',
    status: 'pending',
    reportDate: '2026-06-14',
  };

  pendingAction: ReportAction | null = null;
  toast = { visible: false, type: 'success' as ToastType, title: '', message: '' };

  get modalTitle(): string {
    return this.pendingAction === 'withdraw'
      ? 'Retirar artículo'
      : this.pendingAction === 'reactivate'
        ? 'Reactivar artículo'
        : 'Resolver reporte';
  }

  get modalMessage(): string {
    return this.pendingAction === 'withdraw'
      ? 'El artículo reportado se retirará del catálogo.'
      : this.pendingAction === 'reactivate'
        ? 'El artículo permanecerá visible en el catálogo.'
        : 'El reporte se marcará como resuelto.';
  }

  get reportStatusLabel(): string {
    return this.report.status === 'pending' ? 'Pendiente' : 'Resuelto';
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
      resolve: 'Reporte marcado como resuelto.',
      withdraw: 'Artículo retirado y reporte resuelto.',
      reactivate: 'Artículo reactivado y reporte resuelto.',
    };

    this.toast = {
      visible: true,
      type: 'success',
      title: 'Acción de moderación completada',
      message: messages[this.pendingAction],
    };
    this.pendingAction = null;
  }
}
