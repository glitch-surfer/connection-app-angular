import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subject, catchError, finalize } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../api/auth.service';
import { Notifications } from '../../api/consts/notifications';
import { NotificationService } from '../../core/services/notification.service';
import { SignIn } from '../../api/model/sign-in';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  static incorrectCredentials: SignIn[] = [];

  private loading$$ = new Subject<boolean>();

  loading$ = this.loading$$.asObservable();

  constructor(
    private http: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  onSubmit(form: FormGroup): void {
    const formData = form.value as SignIn;

    this.loading$$.next(true);
    this.http
      .signIn(formData)
      .pipe(
        catchError((err) => {
          this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
          if (err.error.type === 'NotFoundException') {
            form.setErrors({ incorrectCreds: err.error.message });
            SignInService.incorrectCredentials.push(formData);
          }
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe((credentials) => {
        const { email } = form.value;
        const { token, uid } = credentials;
        AuthService.setCredentials({ email, token, uid });

        this.router.navigate(['/']);
        this.notificationService.success(Notifications.SUCCESS_SIGNIN);
      });
  }
}
