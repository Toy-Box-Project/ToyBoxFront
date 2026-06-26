import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Conversation {
  id: number;
  otherUsername: string;
  otherAvatar: string;
  productTitle: string;
  productImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-list.html',
  styleUrls: ['./chat-list.css']
})
export class ChatList implements OnInit {

  searchQuery: string = '';
  selectedConversationId: number | null = null;

  conversations: Conversation[] = [];

  get filteredConversations(): Conversation[] {
    if (!this.searchQuery) return this.conversations;
    const q = this.searchQuery.toLowerCase();
    return this.conversations.filter(c =>
      c.otherUsername.toLowerCase().includes(q) ||
      c.productTitle.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    // DEMO
    this.conversations = [
      {
        id: 1,
        otherUsername: 'María García',
        otherAvatar: '',
        productTitle: 'Osito de peluche',
        productImage: '',
        lastMessage: '¿Sigue disponible?',
        lastMessageTime: '10:30',
        unreadCount: 2
      },
      {
        id: 2,
        otherUsername: 'Carlos López',
        otherAvatar: '',
        productTitle: 'Coche teledirigido',
        productImage: '',
        lastMessage: 'Perfecto, nos vemos el lunes',
        lastMessageTime: 'Ayer',
        unreadCount: 0
      },
      {
        id: 3,
        otherUsername: 'Ana Martínez',
        otherAvatar: '',
        productTitle: 'Puzzle 500 piezas',
        productImage: '',
        lastMessage: '¿Puedes bajar el precio?',
        lastMessageTime: 'Lun',
        unreadCount: 1
      }
    ];
  }

  openConversation(conversationId: number): void {
    this.selectedConversationId = conversationId;
    this.router.navigate(['/chat', conversationId]);
  }
}
