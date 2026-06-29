import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReportsService } from '../../../core/services/reports.service';
import { ReportStatus } from '../../../shared/enums/report-status.enum';

// Shape local para el template
interface ReportRow {
  id: number;
  itemTitle: string;
  reporter: string;
  reportedUser: string;
  reason: string;
  status: 'pending' | 'resolved';
  date: string;
}

@Component({
  selector: 'app-reports-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reports-list.html',
  styleUrl: './reports-list.css'
})
export class ReportsListComponent implements OnInit {
  statusFilter: 'all' | 'pending' | 'resolved' = 'all';
  searchTerm = '';

  reports: ReportRow[] = [];
  isLoading = true;
  error = '';

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.isLoading = true;
    this.error = '';

    this.reportsService.getPending().subscribe({
      next: (res: any) => {
        // Backend devuelve { reports: [], total, page, limit }
        const raw: any[] = res.reports ?? res ?? [];
        this.reports = raw.map(r => ({
          id:           r.id_reports,
          itemTitle:    r.item_title ?? `Artículo #${r.fk_items_id}`,
          reporter:     r.reporter_username ?? `Usuario #${r.fk_user_reports_received}`,
          reportedUser: r.reported_username ?? `Usuario #${r.fk_user_reported}`,
          reason:       r.reason,
          status:       (r.status === ReportStatus.Resolved ? 'resolved' : 'pending') as 'pending' | 'resolved',
          date:         r.report_date ? r.report_date.slice(0, 10) : '',
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = err.status === 403
          ? 'No tienes permisos para ver los reportes.'
          : 'Error al cargar los reportes.';
        this.isLoading = false;
        console.error('Error cargando reportes:', err);
      },
    });
  }

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
}
