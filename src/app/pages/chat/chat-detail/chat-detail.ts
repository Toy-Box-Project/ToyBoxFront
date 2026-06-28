import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChatItem } from '../../../shared/interfaces/chat.interface';
import { ChatMessageWithSender } from '../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-detail.html',
  styleUrls: ['./chat-detail.css']
})
export class ChatDetail implements OnInit, AfterViewChecked {

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  selectedConversationId: number | null = null;
  newMessage: string = '';

  conversations: ChatItem[] = [
    {
      id_conversations: 1,
      otherUserName: 'María García',
      otherUserImage: '',
      itemTitle: 'Osito de peluche',
      itemImage: '',
      lastMessage: '¿Sigue disponible?',
      unreadCount: 2
    },
    {
      id_conversations: 2,
      otherUserName: 'Carlos López',
      itemTitle: 'Coche teledirigido',
      itemImage: '',
      lastMessage: 'Perfecto, nos vemos el lunes',
      unreadCount: 0
    },
    {
      id_conversations: 3,
      otherUserName: 'Ana Martínez',
      itemTitle: 'Puzzle 500 piezas',
      itemImage: '',
      lastMessage: '¿Puedes bajar el precio?',
      unreadCount: 1
    }
  ];

  messages: ChatMessageWithSender[] = [];

  get selectedConversation(): ChatItem | undefined {
    return this.conversations.find(c => c.id_conversations === this.selectedConversationId);
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.selectConversation(+params['id']);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  selectConversation(id: number): void {
    this.selectedConversationId = id;
    this.loadMessages(id);
  }

  loadMessages(conversationId: number): void {
    // DEMO
    this.messages = [
      { 
        id_messages: 1,
        content: '¡Hola! ¿Sigue disponible el juguete?',
        sent_date: '10:20',
        read: true,
        fk_users_id_sent: 2,
        fk_users_id_received: 1,
        fk_conversations_id: conversationId,
        senderName: 'María García',
        senderAvatar: ''
      },
      {
        id_messages: 2,
        content: 'Sí, está disponible. ¿Te interesa?',
        sent_date: '10:22',
        read: true,
        fk_users_id_sent: 1,
        fk_users_id_received: 2,
        fk_conversations_id: conversationId,
        senderName: 'Tú',
        senderAvatar: ''
      },
      {
        id_messages: 3,
        content: '¡Perfecto! ¿Puedes bajar un poco el precio?',
        sent_date: '10:25',
        read: true,
        fk_users_id_sent: 2,
        fk_users_id_received: 1,
        fk_conversations_id: conversationId,
        senderName: 'María García',
        senderAvatar: ''
      },
      {
        id_messages: 4,
        content: 'Puedo dejártelo en 9€ si lo recoges tú',
        sent_date: '10:28',
        read: true,
        fk_users_id_sent: 1,
        fk_users_id_received: 2,
        fk_conversations_id: conversationId,
        senderName: 'Tú',
        senderAvatar: ''
      },
      {
        id_messages: 5,
        content: '¡Trato hecho! ¿Cuándo podemos quedar?',
        sent_date: '10:30',
        read: true,
        fk_users_id_sent: 2,
        fk_users_id_received: 1,
        fk_conversations_id: conversationId,
        senderName: 'María García',
        senderAvatar: ''
      }
    ];
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const msg: ChatMessageWithSender = {
      id_messages: this.messages.length + 1,
      content: this.newMessage.trim(),
      sent_date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      fk_users_id_sent: 1,
      fk_users_id_received: 2,
      fk_conversations_id: this.selectedConversationId || 0,
      senderName: 'Tú',
      senderAvatar: ''
    };

    this.messages.push(msg);
    this.newMessage = '';
    // DEMO
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (e) { }
  }
}
