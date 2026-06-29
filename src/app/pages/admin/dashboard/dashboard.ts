import { Component } from '@angular/core';

interface DashboardMetric {
  label: string;
  value: number;
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
export class AdminDashboardComponent {
  metrics: DashboardMetric[] = [
    { label: 'Active users', value: 1248, detail: '+32 this week', tone: 'blue' },
    { label: 'Published items', value: 386, detail: '18 under review', tone: 'green' },
    { label: 'Categories', value: 12, detail: '2 pending updates', tone: 'amber' },
    { label: 'Open reports', value: 7, detail: '3 high priority', tone: 'red' },
  ];

  tasks: AdminTask[] = [
    { title: 'Review reported listings', owner: 'Moderation', status: 'Pending' },
    { title: 'Update category icons', owner: 'Admin', status: 'In progress' },
    { title: 'Check blocked accounts', owner: 'Support', status: 'Pending' },
  ];
}
