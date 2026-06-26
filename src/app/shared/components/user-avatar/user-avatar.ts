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

  @Input() src: string | null = null;   // URL Cloudinary o null
  @Input() name: string = '';           
  @Input() size: number = 48;           

  defaultAvatar: string = '../assets/images/default-avatar.png';

  get finalSrc(): string | null {
    // Si hay foto → Cloudinary
    if (this.src && this.src.trim() !== '') return this.src;

    // Si NO hay foto → imagen por defecto
    return this.defaultAvatar;
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
