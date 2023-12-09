import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListService } from './services/groups-list.service';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent {
  timer$ = this.groupsListService.timer$;

  constructor(public groupsListService: GroupsListService) {}

  updateGroups() {
    this.groupsListService.setTimer();
  }
}
