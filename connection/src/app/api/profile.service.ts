import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { ProfileDTO } from './model/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileDTO> {
    return this.http.get<ProfileDTO>(`${ApiPaths.BASE_URL}${ApiPaths.PROFILE}`);
  }
}
