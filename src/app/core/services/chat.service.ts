import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Chat } from '../../shared/interfaces/chat.interface';
import { ChatMessage } from '../../shared/interfaces/message.interface';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly API = `${environment.apiUrl}/chats`;

  constructor(private http: HttpClient) {}

  getMyChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.API);
  }

  getChatById(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.API}/${id}`);
  }

  startChat(productId: number): Observable<Chat> {
    return this.http.post<Chat>(this.API, { fk_product_id: productId });
  }

  getMessages(chatId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.API}/${chatId}/messages`);
  }

  sendMessage(chatId: number, content: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.API}/${chatId}/messages`, { content });
  }

  markAsRead(chatId: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${chatId}/read`, {});
  }
}
