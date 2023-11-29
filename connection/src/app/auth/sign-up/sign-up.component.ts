import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {}
