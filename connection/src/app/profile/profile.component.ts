import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProfileControllerService } from './services/profile-controller.service';
import { Profile } from '../store/store.model';

type Errors = 'required' | 'maxlength' | 'pattern';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
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

  onSave(profileData: string | null) {
    if (this.name.invalid || !this.name.value || !profileData) {
      return;
    }

    this.isEditable = false;

    let profile: Profile;
    try {
      profile = JSON.parse(profileData);
    } catch (error) {
      return;
    }
    if (!profile) {
      return;
    }

    this.profileService.updateProfileName(this.name.value, profile);
  }

  hasError(error: Errors): boolean {
    return this.name?.touched && this.name?.errors?.[error];
  }

  onLogout() {
    this.profileService.logout();
  }
}
