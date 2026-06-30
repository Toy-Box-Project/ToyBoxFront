import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatMessageWithSender } from '../../interfaces/message.interface';
// AGREGADO - Importar UserAvatarComponent para reutilizar avatar
import { UserAvatarComponent } from '../user-avatar/user-avatar';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  // MODIFICADO - Agregar UserAvatarComponent en imports
  imports: [CommonModule, UserAvatarComponent],
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

}
