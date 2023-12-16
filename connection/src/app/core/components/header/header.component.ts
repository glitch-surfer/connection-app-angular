import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = AuthService;

  darkTheme: boolean;

  constructor() {
    this.darkTheme = localStorage.getItem('theme') === 'dark';
    document.body.classList.toggle('dark-theme', !this.darkTheme);
  }

  get isAuth() {
    return this.authService.isAuth();
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;

    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', this.darkTheme ? 'dark' : '');
  }
}
