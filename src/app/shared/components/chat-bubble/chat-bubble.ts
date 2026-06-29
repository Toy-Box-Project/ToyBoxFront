import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatMessageWithSender } from '../../interfaces/message.interface';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bubble.html',
  styleUrl: './chat-bubble.css'
})
export class ChatBubbleComponent {
  @Input({ required: true }) message!: ChatMessageWithSender;
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
