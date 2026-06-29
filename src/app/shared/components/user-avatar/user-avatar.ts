import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';

type AvatarSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.css'
})
export class UserAvatarComponent {
  @Input() user: User | null = null;
  @Input() src: string | null = null;
  @Input() name: string = '';
  @Input() size: AvatarSize = 'medium';
  @Input() editable: boolean = false;
  @Output() imageChanged = new EventEmitter<File>();
  @Output() imageDeleted = new EventEmitter<void>();

  showModal = signal(false);

  get finalSrc(): string | null {
    if (this.src && this.src.trim() !== '') {
      return this.src;
    }
    if (this.user?.profile_picture && this.user.profile_picture.trim() !== '') {
      return this.user.profile_picture;
    }
    return null;
  }

  get displayName(): string {
    if (this.name && this.name.trim() !== '') {
      return this.name;
    }
    if (this.user) {
      return `${this.user.first_name || ''} ${this.user.last_name || ''}`.trim();
    }
    return '';
  }

  get initials(): string {
    const displayName = this.displayName;
    if (!displayName) return '?';

    const parts = displayName.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
  }

  get sizeClass(): string {
    return `avatar--${this.size}`;
  }

  get sizePixels(): number {
    switch (this.size) {
      case 'small':
        return 32;
      case 'medium':
        return 48;
      case 'large':
        return 80;
      default:
        return 48;
    }
  }

  openModal(): void {
    if (!this.editable) {
      this.showModal.set(true);
    }
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  onImageSelected(event: Event): void {
    if (!this.editable) return;

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          this.imageChanged.emit(file);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    if (input) input.value = '';
  }

  deleteImage(): void {
    if (!this.editable) return;

    const confirmed = confirm('¿Estás seguro de que deseas eliminar tu foto de perfil?');
    if (confirmed) {
      this.imageDeleted.emit();
    }
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector(
      `.avatar-edit-${this.hashCode(this.displayName)} input[type="file"]`
    ) as HTMLInputElement;
    fileInput?.click();
  }

  private hashCode(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  }
}
