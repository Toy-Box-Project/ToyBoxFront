import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// DEMO - use interface ReportItem
interface ReportRow {
  id: number;
  itemTitle: string;
  reporter: string;
  reportedUser: string;
  reason: string;
  status: 'pending' | 'resolved';
  date: string;
}

const REPORT_STATUS_LABELS: Record<ReportRow['status'], string> = {
  pending: 'Pendiente',
  resolved: 'Resuelto',
};

@Component({
  selector: 'app-reports-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './reports-list.html',
  styleUrl: './reports-list.css'
})
export class ReportsListComponent {
  statusFilter: 'all' | 'pending' | 'resolved' = 'all';
  searchTerm = '';

  reports: ReportRow[] = [
    {
      id: 101,
      itemTitle: 'Consola vintage',
      reporter: 'ana_user',
      reportedUser: 'seller_82',
      reason: 'Estado del producto engañoso',
      status: 'pending',
      date: '2026-06-14',
    },
    {
      id: 102,
      itemTitle: 'Bicicleta de montaña',
      reporter: 'buyer_madrid',
      reportedUser: 'sport_seller',
      reason: 'Anuncio sospechoso',
      status: 'pending',
      date: '2026-06-13',
    },
    {
      id: 103,
      itemTitle: 'Lámpara de escritorio',
      reporter: 'lucia_home',
      reportedUser: 'decor_shop',
      reason: 'Descripción ofensiva',
      status: 'resolved',
      date: '2026-06-10',
    },
  ];

  get filteredReports(): ReportRow[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.reports.filter(report => {
      const matchesStatus = this.statusFilter === 'all' || report.status === this.statusFilter;
      const matchesTerm = !term ||
        report.itemTitle.toLowerCase().includes(term) ||
        report.reason.toLowerCase().includes(term) ||
        report.reportedUser.toLowerCase().includes(term);

      return matchesStatus && matchesTerm;
    });
  }

  statusLabel(status: ReportRow['status']): string {
    return REPORT_STATUS_LABELS[status];
  }
}
