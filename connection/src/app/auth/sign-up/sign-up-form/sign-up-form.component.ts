import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { passwordValidator } from './validators/password-validator';
import { SignUpService } from '../sign-up.service';
import { duplicatedEmailValidator } from './validators/duplicated-email';

type Errors = 'required' | 'email' | 'weakPassword' | 'duplicatedEmail' | 'maxlength' | 'pattern';

type ControlNames = 'name' | 'email' | 'password';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  loading$ = this.signUpService.loading$;

  public form = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-Zа-яА-Я ]+$/),
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, duplicatedEmailValidator()],
    }),
    password: new FormControl('', { validators: [Validators.required, passwordValidator()] }),
  });

  constructor(private signUpService: SignUpService) {}

  onSubmit() {
    this.signUpService.onSubmit(this.form);
  }

  hasError(controlName: ControlNames, error: Errors): boolean {
    const login = this.form.get(controlName);
    return login?.touched && login?.errors?.[error];
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }
}
