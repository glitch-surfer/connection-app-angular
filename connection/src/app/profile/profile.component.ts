import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileControllerService } from './services/profile-controller.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profile$ = this.profileService.getProfile();

  loading$ = this.profileService.loading$;

  constructor(private profileService: ProfileControllerService) {}
}
