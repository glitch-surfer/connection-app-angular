import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subject, catchError, finalize } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../api/auth.service';
import { Notifications } from '../../api/consts/notifications';
import { SignUp } from '../../api/model/sign-up';
import { NotificationService } from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  static duplicatedEmail = '';

  private loading$$ = new Subject<boolean>();

  loading$ = this.loading$$.asObservable();

  constructor(
    private http: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      form.markAllAsTouched();
      return;
    }

    const formData = form.value as SignUp;

    this.loading$$.next(true);
    this.http
      .signUp(formData)
      .pipe(
        catchError((err) => {
          this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
          if (err.error.type === 'PrimaryDuplicationException') {
            const email = form.get('email') as FormControl;
            email.setErrors({ duplicatedEmail: err.error.message });
            SignUpService.duplicatedEmail = email.value;
          }
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe(() => {
        this.router.navigate(['/signin']);
        this.notificationService.success(Notifications.SUCCESS_SIGNUP);
      });
  }
}
