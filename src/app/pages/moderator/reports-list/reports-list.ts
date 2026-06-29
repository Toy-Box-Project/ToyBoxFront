import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
      itemTitle: 'Vintage console',
      reporter: 'ana_user',
      reportedUser: 'seller_82',
      reason: 'Misleading product condition',
      status: 'pending',
      date: '2026-06-14',
    },
    {
      id: 102,
      itemTitle: 'Mountain bike',
      reporter: 'buyer_madrid',
      reportedUser: 'sport_seller',
      reason: 'Suspicious listing',
      status: 'pending',
      date: '2026-06-13',
    },
    {
      id: 103,
      itemTitle: 'Desk lamp',
      reporter: 'lucia_home',
      reportedUser: 'decor_shop',
      reason: 'Offensive description',
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
}
