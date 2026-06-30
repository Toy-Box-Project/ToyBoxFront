import { Component } from '@angular/core';

// interface LOCAL
interface DashboardMetric {
  label: string;
  value: number;
  detail: string;
  tone: 'blue' | 'green' | 'amber' | 'red';
}

// interface LOCAL
interface AdminTask {
  title: string;
  owner: string;
  status: string;
}

interface ChartItem {
  label: string;
  value: number;
  percent: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent {
  metrics: DashboardMetric[] = [
    { label: 'Usuarios activos', value: 1248, detail: '+32 esta semana', tone: 'blue' },
    { label: 'Artículos publicados', value: 386, detail: '18 en revisión', tone: 'green' },
    { label: 'Categorías', value: 12, detail: '2 pendientes de actualizar', tone: 'amber' },
    { label: 'Reportes abiertos', value: 7, detail: '3 de prioridad alta', tone: 'red' },
  ];

  tasks: AdminTask[] = [
    { title: 'Revisar anuncios reportados', owner: 'Moderación', status: 'Pendiente' },
    { title: 'Actualizar iconos de categorías', owner: 'Administración', status: 'En curso' },
    { title: 'Comprobar cuentas bloqueadas', owner: 'Soporte', status: 'Pendiente' },
  ];

  chartItems: ChartItem[] = [
    { label: 'Usuarios', value: 1248, percent: 92 },
    { label: 'Artículos', value: 386, percent: 64 },
    { label: 'Reportes', value: 7, percent: 28 },
  ];
}
