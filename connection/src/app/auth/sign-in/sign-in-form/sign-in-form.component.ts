import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from './validators/password-validator';
import { SignInService } from '../sign-in.service';
import { notFoundEmailValidator } from './validators/not-found-email';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
  loading$ = this.signInService.loading$;

  public form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, notFoundEmailValidator()],
    }),
    password: new FormControl('', { validators: [Validators.required, passwordValidator()] }),
  });

  constructor(private signInService: SignInService) {}

  onSubmit() {
    this.signInService.onSubmit(this.form);
  }

  hasError(
    controlName: 'email' | 'password',
    error: 'required' | 'email' | 'weakPassword' | 'notFound',
  ): boolean {
    const login = this.form.get(controlName);
    return login?.touched && login?.errors?.[error];
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }
}
