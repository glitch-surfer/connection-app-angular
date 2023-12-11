import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { CreateGroupResponse, GroupDTO } from './model/groups';
import { DialogDTO } from './model/group-dialog';

@Injectable({
  providedIn: 'root',
})
export class GroupHttpService {
  constructor(private http: HttpClient) {}

  getGroupsList(): Observable<GroupDTO> {
    return this.http.get<GroupDTO>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_LIST}`);
  }

  createGroup(name: string): Observable<CreateGroupResponse> {
    return this.http.post<CreateGroupResponse>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_CREATE}`, {
      name,
    });
  }

  deleteGroup(id: string): Observable<null> {
    const params = new HttpParams().set('groupID', id);
    return this.http.delete<null>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_DELETE}`, { params });
  }

  getMessages(groupId: string, since: string): Observable<DialogDTO> {
    const params = new HttpParams().set('groupID', groupId).set('since', since);

    return this.http.get<DialogDTO>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_DIALOG}`, {
      params,
    });
  }

  sendMessage(groupID: string, message: string): Observable<null> {
    return this.http.post<null>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_SEND_MESSAGE}`, {
      groupID,
      message,
    });
  }
}
