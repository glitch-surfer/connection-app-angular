import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileControllerService } from './services/profile-controller.service';

type Errors = 'required' | 'maxlength' | 'pattern';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  name = new FormControl('', {
    validators: [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern(/^[a-zA-Zа-яА-Я ]+$/),
    ],
  });

  profile$ = this.profileService.profile$;

  loading$ = this.profileService.loading$;

  isEditable = false;

  constructor(private profileService: ProfileControllerService) {}

  ngOnInit(): void {
    this.profileService.getProfile();
  }

  onEdit(name: string | null) {
    if (!name) {
      return;
    }

    this.isEditable = true;
    this.name.setValue(name);
  }

  onSave() {
    if (this.name.invalid || !this.name.value) {
      return;
    }

    this.isEditable = false;

    this.profileService.updateProfileName(this.name.value);
  }

  hasError(error: Errors): boolean {
    return this.name?.touched && this.name?.errors?.[error];
  }

  onLogout() {
    this.profileService.logout();
  }
}
