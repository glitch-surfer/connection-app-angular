import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { SignUp } from './model/sign-up';
import { Credentials, SignIn, SignInResponse } from './model/sign-in';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(body: SignUp): Observable<null> {
    return this.http.post<null>(`${ApiPaths.BASE_URL}${ApiPaths.SIGN_UP}`, body);
  }

  signIn(body: SignIn): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${ApiPaths.BASE_URL}${ApiPaths.SIGN_IN}`, body);
  }

  signOut(): Observable<null> {
    return this.http.delete<null>(`${ApiPaths.BASE_URL}${ApiPaths.LOGOUT}`);
  }

  static isAuth(): boolean {
    const credentials = AuthService.getCredentials();
    if (
      !credentials ||
      credentials.uid === '' ||
      credentials.token === '' ||
      credentials.email === ''
    )
      return false;

    return true;
  }

  static setCredentials(credentials: Credentials): void {
    const { email, token, uid } = credentials;

    if (!email || !token || !uid) return;

    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('uid', uid);
  }

  static getCredentials(): Credentials {
    return {
      email: localStorage.getItem('email') || '',
      token: localStorage.getItem('token') || '',
      uid: localStorage.getItem('uid') || '',
    };
  }

  static removeCredentials(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  }
}
