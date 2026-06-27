import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatMessageWithSender } from '../../interfaces/message.interface';

// ✅ NUEVO: componente creado desde cero (carpeta existía vacía)
// Representa un mensaje individual dentro de un chat.
// Uso: <app-chat-bubble [message]="msg" [isOwn]="msg.senderId === currentUserId">

export interface ChatMessage {
  id: number;
  text: string;
  senderId: number;
  senderAvatar: string | null;
  senderName: string;
  sentAt: Date;
  read: boolean;
}
@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bubble.html',
  styleUrl: './chat-bubble.css'
})
export class ChatBubbleComponent {
  /** The message to display */
  @Input({ required: true }) message!: ChatMessageWithSender;
  /** True if the message was sent by the current user (bubble on the right) */
  @Input() isOwn = false;

  get shouldShowAvatar(): boolean {
    return !this.isOwn;
  }

  getReadStatusLabel(): string {
    return this.message.read ? 'Leído' : 'Enviado';
  }

  getSenderInitial(): string {
    return this.message.senderName.charAt(0).toUpperCase();
  }
}
