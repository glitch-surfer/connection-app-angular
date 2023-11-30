import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { SignUp } from './model/sign-up';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(body: SignUp): Observable<null> {
    return this.http.post<null>(`${ApiPaths.BASE_URL}${ApiPaths.SIGN_UP}`, body);
  }
}
