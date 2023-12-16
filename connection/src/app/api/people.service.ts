import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { ConversationDTO, NewConversation, PeopleDTO } from './model/peoples';
import { DialogDTO } from './model/group-dialog';

@Injectable({
  providedIn: 'root',
})
export class PeopleHttpService {
  constructor(private http: HttpClient) {}

  getPeoplesList(): Observable<PeopleDTO> {
    return this.http.get<PeopleDTO>(`${ApiPaths.BASE_URL}${ApiPaths.PEOPLE_LIST}`);
  }

  getConversationsList(): Observable<ConversationDTO> {
    return this.http.get<ConversationDTO>(`${ApiPaths.BASE_URL}${ApiPaths.CONVERSATIONS_LIST}`);
  }

  createConversation(companion: string): Observable<NewConversation> {
    return this.http.post<NewConversation>(`${ApiPaths.BASE_URL}${ApiPaths.CONVERSATION_CREATE}`, {
      companion,
    });
  }

  getMessages(conversationId: string, since: string): Observable<DialogDTO> {
    const params = new HttpParams().set('conversationID', conversationId).set('since', since);

    return this.http.get<DialogDTO>(`${ApiPaths.BASE_URL}${ApiPaths.CONVERSATION_MESSAGES}`, {
      params,
    });
  }

  sendMessage(conversationID: string, message: string): Observable<null> {
    return this.http.post<null>(`${ApiPaths.BASE_URL}${ApiPaths.CONVERSATION_SEND_MESSAGE}`, {
      conversationID,
      message,
    });
  }

  deleteConversation(id: string): Observable<null> {
    const params = new HttpParams().set('conversationID', id);

    return this.http.delete<null>(`${ApiPaths.BASE_URL}${ApiPaths.CONVERSATION_DELETE}`, {
      params,
    });
  }
}
