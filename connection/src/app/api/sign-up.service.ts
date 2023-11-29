import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from './api-paths';
import { SignUp } from './model/sign-up';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  signUp(body: SignUp): Observable<SignUp> {
    return this.http.post<SignUp>(`${ApiPaths.BASE_URL}${ApiPaths.SIGN_UP}`, body);
  }
}
