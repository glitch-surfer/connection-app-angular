import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { SignInResponse, SignUp } from './model/sign-up';
import { SignIn } from './model/sign-in';

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
}
