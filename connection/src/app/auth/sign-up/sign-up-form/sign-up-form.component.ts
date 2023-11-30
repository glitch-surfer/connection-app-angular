import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../api/auth.service';
import { SignUp } from '../../../api/model/sign-up';
import { passwordValidator } from './validators/password-validator';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  public form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, passwordValidator()] }),
  });

  constructor(
    private http: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value as SignUp;

    this.http
      .signUp(formData)
      .pipe(
        catchError((err) => {
          this.snackBar.open(err.error.message, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
          return throwError(() => new Error(err.error.message));
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/signin']);
        this.snackBar.open('Account created successfully', 'Close', {
          duration: 5000,
        });
      });
  }

  hasError(
    controlName: 'name' | 'email' | 'password',
    error: 'required' | 'email' | 'weakPassword',
  ): boolean {
    const login = this.form.get(controlName);
    return login?.touched && login?.errors?.[error];
  }

  get password() {
    return this.form.get('password');
  }
}
