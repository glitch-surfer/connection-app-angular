import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { ConversationDTO, NewConversation, PeopleDTO } from './model/peoples';

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

  // createConversation(name: string): Observable<CreateGroupResponse> {
  //   return this.http.post<CreateGroupResponse>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_CREATE}`, {
  //     name,
  //   });
  // }

  // deleteGroup(id: string): Observable<null> {
  //   const params = new HttpParams().set('groupID', id);
  //   return this.http.delete<null>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_DELETE}`, { params });
  // }
}
