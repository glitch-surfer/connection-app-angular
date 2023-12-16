import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { passwordValidator } from './validators/password-validator';
import { SignInService } from '../sign-in.service';
import { incorrectCredentialsValidator } from './validators/incorrect-credentials';

type ControlNames = 'email' | 'password';

type Errors = 'required' | 'email' | 'weakPassword' | 'incorrectCreds';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
  loading$ = this.signInService.loading$;

  public form = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required, passwordValidator()] }),
    },
    { validators: [incorrectCredentialsValidator()] },
  );

  constructor(private signInService: SignInService) {}

  onSubmit() {
    this.signInService.onSubmit(this.form);
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
}
