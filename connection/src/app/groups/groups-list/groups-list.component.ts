import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GroupsListService } from './services/groups-list.service';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent implements OnInit {
  groups$ = this.groupsListService.groups$;

  userId$ = this.groupsListService.userId$;

  timer$ = this.groupsListService.timer$;

  loading$ = this.groupsListService.loading$;

  constructor(private groupsListService: GroupsListService) {}

  ngOnInit(): void {
    this.groupsListService.initGroupsList();
  }

  updateGroups() {
    this.groupsListService.getGroupsList();
    this.groupsListService.setTimer();
  }

  openDialog() {
    this.groupsListService.openCreateGroupDialog();
  }

  deleteGroup(groupId: string) {
    this.groupsListService.deleteGroup(groupId);
  }
}
