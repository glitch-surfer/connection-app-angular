import { Injectable } from '@angular/core';
import { ProfileHttpService } from '../api/profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileControllerService {
  constructor(private http: ProfileHttpService) {}

  getProfile() {
    return this.http.getProfile();
  }
}
