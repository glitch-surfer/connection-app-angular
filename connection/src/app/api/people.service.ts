import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { PeopleDTO } from './model/peoples';

@Injectable({
  providedIn: 'root',
})
export class PeopleHttpService {
  constructor(private http: HttpClient) {}

  getPeoplesList(): Observable<PeopleDTO> {
    return this.http.get<PeopleDTO>(`${ApiPaths.BASE_URL}${ApiPaths.PEOPLE_LIST}`);
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
