import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatItem } from '../../../shared/interfaces/chat.interface';
import { ChatService } from '../../../core/services/chat.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './chat-list.html',
  styleUrls: ['./chat-list.css']
})
export class ChatList implements OnInit {

  searchQuery: string = '';
  selectedConversationId: number | null = null;
  breadcrumbItems: any[] = [];
  conversations: ChatItem[] = [];

  get filteredConversations(): ChatItem[] {
    if (!this.searchQuery) return this.conversations;
    const q = this.searchQuery.toLowerCase();
    return this.conversations.filter(c =>
      c.otherUserName.toLowerCase().includes(q) ||
      c.itemTitle.toLowerCase().includes(q) ||
      c.lastMessage?.toLowerCase().includes(q)
    );
  }

  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private ngZone: NgZone,  

    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.initializeBreadcrumbs();
    this.loadConversations();
  }

  private initializeBreadcrumbs(): void {
    const isLoggedIn = this.authService.isLoggedIn();
    const homeRoute = isLoggedIn ? '/catalog' : '/home';

    this.breadcrumbItems = [
      { label: 'Inicio', route: homeRoute, icon: 'home' },
      { label: 'Buzón', icon: 'inbox' }
    ];
  }

  loadConversations(): void {
    this.chatService.getMyChats().subscribe({
      next: (chats: any[]) => {

        this.ngZone.run(() => { 
        this.conversations = chats.map((chat: any) => {
          const currentUserId = this.authService.currentUser()?.id_users;
          const isMe_Seller = chat.fk_seller_id === currentUserId;
          const otherUserName = isMe_Seller ? chat.buyer_username : chat.seller_username;

          return {
            id_conversations: chat.id_conversations,
            otherUserName: otherUserName ?? 'Usuario',
            otherUserImage: '', 
            itemTitle: chat.item_title ?? 'Producto', 
            itemImage: chat.item_photo ?? '',         
            lastMessage: chat.last_message ?? '',      
            lastMessageAt: chat.created_at ?? '',      
            unreadCount: chat.unread_count ?? 0        
          };
        });
        this.cdr.detectChanges();  
      });

      },
      error: (err) => {
        console.error('Error cargando conversaciones:', err);
        this.conversations = [];  
      }
    });
  }

    openConversation(conversationId: number): void {
      this.selectedConversationId = conversationId;
      this.router.navigate(['/chat', conversationId]);
  }

  isToday(dateString: string): boolean {
    const msgDate = new Date(dateString);
    const today = new Date();
    return msgDate.toDateString() === today.toDateString();
  }

  isYesterday(dateString: string): boolean {
    const msgDate = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return msgDate.toDateString() === yesterday.toDateString();
  }


}