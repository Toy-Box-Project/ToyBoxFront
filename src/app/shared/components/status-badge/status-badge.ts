import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css'
})
export class StatusBadgeComponent {

  @Input() status:
    'available'
    | 'reserved'
    | 'sold'
    | 'new'
    | 'used'
    | 'featured'
    = 'available';

  @Input() label = '';

  get badgeClass(): string {

    return `badge ${this.status}`;

  }

}