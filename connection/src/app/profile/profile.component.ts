import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileControllerService } from './services/profile-controller.service';

type Errors = 'required' | 'maxlength' | 'pattern';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  name = new FormControl('', {
    validators: [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern(/^[a-zA-Zа-яА-Я ]+$/),
    ],
  });

  profile$ = this.profileService.getProfile();

  loading$ = this.profileService.loading$;

  isEditable = false;

  constructor(private profileService: ProfileControllerService) {}

  onEdit(name: string | null) {
    if (!name) {
      return;
    }

    this.isEditable = true;
    this.name.setValue(name);
  }

  onSave() {
    if (!this.name) {
      return;
    }

    this.isEditable = false;
  }

  hasError(error: Errors): boolean {
    return this.name?.touched && this.name?.errors?.[error];
  }
}
