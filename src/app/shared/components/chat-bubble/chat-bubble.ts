import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  @Input({ required: true }) message!: ChatMessage;

  /** True if the message was sent by the current user (bubble on the right) */
  @Input() isOwn = false;

  //   getStatusIcon(): string {
  //   switch (this.message.status) {
  //     case MessageStatus.PENDING:
  //       return 'schedule'; // Ícono de reloj (pendiente)
  //     case MessageStatus.SENT:
  //       return 'done'; // Ícono de check (enviado)
  //     case MessageStatus.READ:
  //       return 'done_all'; // Ícono de doble check (leído)
  //     case MessageStatus.FAILED:
  //       return 'error'; // Ícono de error
  //     default:
  //       return 'done';
  //   }
  // }

  //   getStatusLabel(): string {
  //   switch (this.message.status) {
  //     case MessageStatus.PENDING:
  //       return 'Pendiente';
  //     case MessageStatus.SENT:
  //       return 'Enviado';
  //     case MessageStatus.READ:
  //       return 'Leído';
  //     case MessageStatus.FAILED:
  //       return 'Error al enviar';
  //     default:
  //       return '';
  //   }
  // }
}
