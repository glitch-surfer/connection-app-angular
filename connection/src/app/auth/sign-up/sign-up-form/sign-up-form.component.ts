import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from './validators/password-validator';
import { SignUpService } from '../sign-up.service';

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

  constructor(private signUpService: SignUpService) {}

  onSubmit() {
    this.signUpService.onSubmit(this.form);
  }

  hasError(
    controlName: 'name' | 'email' | 'password',
    error: 'required' | 'email' | 'weakPassword' | 'duplicatedEmail',
  ): boolean {
    const login = this.form.get(controlName);
    return login?.touched && login?.errors?.[error];
  }

  get password() {
    return this.form.get('password');
  }
}
