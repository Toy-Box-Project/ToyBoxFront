import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatItem } from '../../../shared/interfaces/chat.interface';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    // DEMO
    this.conversations = [
      {
        id_conversations: 1,
        otherUserName: 'María García',
        otherUserImage: '',
        itemTitle: 'Osito de peluche',
        itemImage: '',
        lastMessage: '¿Sigue disponible?',
        lastMessageAt: '10:30',
        unreadCount: 2
      },
      {
        id_conversations: 2,
        otherUserName: 'Carlos López',
        otherUserImage: '',
        itemTitle: 'Coche teledirigido',
        itemImage: '',
        lastMessage: 'Perfecto, nos vemos el lunes',
        lastMessageAt: 'Ayer',
        unreadCount: 0
      },
      {
        id_conversations: 3,
        otherUserName: 'Ana Martínez',
        otherUserImage: '',
        itemTitle: 'Puzzle 500 piezas',
        itemImage: '',
        lastMessage: '¿Puedes bajar el precio?',
        lastMessageAt: 'Lun',
        unreadCount: 1
      }
    ];
  }

  openConversation(conversationId: number): void {
    this.selectedConversationId = conversationId;
    this.router.navigate(['/chat', conversationId]);
  }
}
