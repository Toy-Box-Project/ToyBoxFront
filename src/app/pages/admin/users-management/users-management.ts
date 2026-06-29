import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm';
import { ToastComponent, ToastType } from '../../../shared/components/toast/toast';

interface UserRow {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'moderator' | 'administrator';
  status: 'active' | 'blocked';
  publishedItems: number;
}

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalConfirmComponent, ToastComponent],
  templateUrl: './users-management.html',
  styleUrl: './users-management.css'
})
export class UsersManagementComponent {
  users: UserRow[] = [
    { id: 1, username: 'ana_user', email: 'ana@example.com', role: 'user', status: 'active', publishedItems: 6 },
    { id: 2, username: 'moderator_john', email: 'john@example.com', role: 'moderator', status: 'active', publishedItems: 0 },
    { id: 3, username: 'blocked_seller', email: 'seller@example.com', role: 'user', status: 'blocked', publishedItems: 2 },
  ];

  searchTerm = '';
  statusFilter: 'all' | 'active' | 'blocked' = 'all';
  selectedUser: UserRow | null = null;
  toast = { visible: false, type: 'success' as ToastType, title: '', message: '' };

  get filteredUsers(): UserRow[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.users.filter(user => {
      const matchesStatus = this.statusFilter === 'all' || user.status === this.statusFilter;
      const matchesTerm = !term ||
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      return matchesStatus && matchesTerm;
    });
  }

  askStatusChange(user: UserRow): void {
    this.selectedUser = user;
  }

  confirmStatusChange(): void {
    if (!this.selectedUser) {
      return;
    }

    const nextStatus = this.selectedUser.status === 'active' ? 'blocked' : 'active';
    this.users = this.users.map(user =>
      user.id === this.selectedUser?.id ? { ...user, status: nextStatus } : user
    );

    this.showToast(
      'success',
      'User updated',
      `${this.selectedUser.username} is now ${nextStatus}.`
    );
    this.selectedUser = null;
  }

  private showToast(type: ToastType, title: string, message: string): void {
    this.toast = { visible: true, type, title, message };
  }
}
