import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Conversation {
  id: number;
  otherUsername: string;
  productTitle: string;
  productImage: string;
  lastMessage: string;
  unreadCount: number;
}

interface Message {
  id: number;
  content: string;
  isSent: boolean;
  time: string;
}

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

  conversations: Conversation[] = [
    {
      id: 1,
      otherUsername: 'María García',
      productTitle: 'Osito de peluche',
      productImage: '',
      lastMessage: '¿Sigue disponible?',
      unreadCount: 2
    },
    {
      id: 2,
      otherUsername: 'Carlos López',
      productTitle: 'Coche teledirigido',
      productImage: '',
      lastMessage: 'Perfecto, nos vemos el lunes',
      unreadCount: 0
    },
    {
      id: 3,
      otherUsername: 'Ana Martínez',
      productTitle: 'Puzzle 500 piezas',
      productImage: '',
      lastMessage: '¿Puedes bajar el precio?',
      unreadCount: 1
    }
  ];

  messages: Message[] = [];

  get selectedConversation(): Conversation | undefined {
    return this.conversations.find(c => c.id === this.selectedConversationId);
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
      { id: 1, content: '¡Hola! ¿Sigue disponible el juguete?', isSent: false, time: '10:20' },
      { id: 2, content: 'Sí, está disponible. ¿Te interesa?', isSent: true, time: '10:22' },
      { id: 3, content: '¡Perfecto! ¿Puedes bajar un poco el precio?', isSent: false, time: '10:25' },
      { id: 4, content: 'Puedo dejártelo en 9€ si lo recoges tú', isSent: true, time: '10:28' },
      { id: 5, content: '¡Trato hecho! ¿Cuándo podemos quedar?', isSent: false, time: '10:30' },
    ];
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const msg: Message = {
      id: this.messages.length + 1,
      content: this.newMessage.trim(),
      isSent: true,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
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
