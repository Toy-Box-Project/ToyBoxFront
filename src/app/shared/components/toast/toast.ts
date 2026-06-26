import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class ToastComponent {
  @Input() visible = false;
  @Input() type: ToastType = 'success';
  @Input() title = '';
  @Input() message = '';

  @Output() dismissed = new EventEmitter<void>();

  dismiss(): void {
    this.dismissed.emit();
  }
}
