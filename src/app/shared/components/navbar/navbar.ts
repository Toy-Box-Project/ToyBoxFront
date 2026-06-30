import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ChatService } from '../../../core/services/chat.service';

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

  unreadMessagesCount: number = 0;
  unreadNotificationsCount: number = 0; // lo conectamos cuando tengamos el servicio

  constructor(
    private router: Router,
    private authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    const user = this.authService.currentUser();
    this.userAvatar = user?.profile_picture || '';

    if (this.isLoggedIn) {
      this.loadUnreadMessages();
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

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  goToCreateProduct(): void {
    this.router.navigate(['/product/create']);
  }
}