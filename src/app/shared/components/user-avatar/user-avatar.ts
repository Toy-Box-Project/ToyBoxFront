import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.css'
})
export class UserAvatarComponent {
  @Input() src: string | null = null;
  @Input() name: string = '';
  @Input() size: number = 48;
  @Input() clickable: boolean = false;

  get finalSrc(): string | null {
    if (this.src && this.src.trim() !== '') {
      return this.src;
    }
    return null;
  }

  get initials(): string {
    if (!this.name) return '?';
    return this.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
