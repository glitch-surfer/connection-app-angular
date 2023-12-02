import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subject, catchError, finalize } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../api/auth.service';
import { Notifications } from '../../api/consts/notifications';
import { NotificationService } from '../../core/services/notification.service';
import { SignIn } from '../../api/model/sign-in';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  static notFoundEmail = '';

  private loading$$ = new Subject<boolean>();

  loading$ = this.loading$$.asObservable();

  constructor(
    private http: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      form.markAllAsTouched();
      return;
    }

    const formData = form.value as SignIn;

    this.loading$$.next(true);
    this.http
      .signIn(formData)
      .pipe(
        catchError((err) => {
          this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
          if (err.error.type === 'NotFoundException') {
            const email = form.get('email') as FormControl;
            email.setErrors({ notFound: err.error.message });
            SignInService.notFoundEmail = email.value;
          }
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe((credentials) => {
        const { email } = form.value;
        const { token, uid } = credentials;
        SignInService.setCredentials(email, token, uid);

        this.router.navigate(['/groups']);
        this.notificationService.success(Notifications.SUCCESS_SIGNIN);
      });
  }

  static setCredentials(email: string, token: string, uid: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('uid', uid);
  }

  static getCredentials(): { email: string; token: string; uid: string } {
    return {
      email: localStorage.getItem('email') || '',
      token: localStorage.getItem('token') || '',
      uid: localStorage.getItem('uid') || '',
    };
  }
}
