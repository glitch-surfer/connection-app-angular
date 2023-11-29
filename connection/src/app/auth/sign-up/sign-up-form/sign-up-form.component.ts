import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from './validators/password-validator';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  public form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, passwordValidator()] }),
  });

  onSubmit() {
    if (this.form.valid) {
      // this.authService.login('token');
    } else {
      this.form.markAllAsTouched();
    }
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
