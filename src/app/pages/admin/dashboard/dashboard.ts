import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface DashboardMetric {
  label: string;
  value: number | string;
  detail: string;
  tone: 'blue' | 'green' | 'amber' | 'red';
}

interface AdminTask {
  title: string;
  owner: string;
  status: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  metrics: DashboardMetric[] = [];
  tasks: AdminTask[] = [];
  isLoading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;
    this.http.get<any>(`${environment.apiUrl}/admin/stats`).subscribe({
      next: (stats) => {
        const activeUsers = (stats.users_by_status ?? [])
          .find((s: any) => s.status === 'active')?.total ?? 0;
        const publishedItems = (stats.items_by_status ?? [])
          .find((s: any) => s.conservation_status === 'published')?.total ?? 0;

        this.metrics = [
          {
            label:  'Usuarios activos',
            value:  activeUsers,
            detail: `${stats.total_completed_sales ?? 0} ventas completadas`,
            tone:   'blue',
          },
          {
            label:  'Artículos publicados',
            value:  publishedItems,
            detail: `${stats.pending_reservations ?? 0} reservas pendientes`,
            tone:   'green',
          },
          {
            label:  'Categorías top',
            value:  (stats.top_categories ?? []).length,
            detail: stats.top_categories?.[0]?.name ?? 'Sin datos',
            tone:   'amber',
          },
          {
            label:  'Reportes pendientes',
            value:  stats.pending_reports ?? 0,
            detail: (stats.pending_reports ?? 0) > 0 ? 'Requieren revisión' : 'Sin pendientes',
            tone:   'red',
          },
        ];

        this.tasks = [];
        if ((stats.pending_reports ?? 0) > 0) {
          this.tasks.push({
            title:  `Revisar ${stats.pending_reports} reportes pendientes`,
            owner:  'Moderación',
            status: 'Pendiente',
          });
        }
        if ((stats.pending_reservations ?? 0) > 0) {
          this.tasks.push({
            title:  `Gestionar ${stats.pending_reservations} reservas pendientes`,
            owner:  'Soporte',
            status: 'Pendiente',
          });
        }
        const blockedUsers = (stats.users_by_status ?? [])
          .find((s: any) => s.status === 'blocked')?.total ?? 0;
        if (blockedUsers > 0) {
          this.tasks.push({
            title:  `Revisar ${blockedUsers} cuentas bloqueadas`,
            owner:  'Admin',
            status: 'Pendiente',
          });
        }
        if (this.tasks.length === 0) {
          this.tasks.push({ title: 'Sin tareas pendientes', owner: 'Sistema', status: 'OK' });
        }

        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las estadísticas del panel.';
        this.isLoading = false;
        console.error('Error cargando stats admin:', err);
      },
    });
  }
}
