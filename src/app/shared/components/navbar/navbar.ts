import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ChatService } from '../../../core/services/chat.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { UserRole } from '../../enums/user-role.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  userAvatar: string = '';
  userRole: UserRole | null = null;

  isModerator: boolean = false;
  isAdministrator: boolean = false;

  unreadMessagesCount: number = 0;
  unreadNotificationsCount: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private chatService: ChatService,
    public notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    const user = this.authService.currentUser();
    this.userAvatar = user?.profile_picture || '';
    this.userRole = user?.role ?? null;

    this.isModerator = this.userRole === UserRole.Moderator;
    this.isAdministrator = this.userRole === UserRole.Administrator;

    if (this.isLoggedIn) {
      this.loadUnreadMessages();
      this.loadUnreadNotifications();
    }
  }

  loadUnreadMessages(): void {
    this.chatService.getMyChats().subscribe({
      next: (chats) => {
        this.unreadMessagesCount = chats.reduce((total, chat) => total + (chat.unreadCount || 0), 0);
      },
      error: (err) => {
        console.error('Error cargando chats para contador:', err);
      }
    });
  }

  loadUnreadNotifications(): void {
    this.notificationsService.refreshUnreadCount();
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  goToCreateProduct(): void {
    this.router.navigate(['/product/create']);
  }

  goToReports(): void {
    this.router.navigate(['/moderator/reports']);
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}