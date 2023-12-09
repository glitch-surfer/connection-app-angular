import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { GroupDTO } from './model/groups';

@Injectable({
  providedIn: 'root',
})
export class GroupHttpService {
  constructor(private http: HttpClient) {}

  getGroupsList(): Observable<GroupDTO> {
    return this.http.get<GroupDTO>(`${ApiPaths.BASE_URL}${ApiPaths.GROUPS_LIST}`);
  }
}
