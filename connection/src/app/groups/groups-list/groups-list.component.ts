import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListService } from './services/groups-list.service';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent implements OnInit {
  groups$ = this.groupsListService.groups$;

  timer$ = this.groupsListService.timer$;

  constructor(private groupsListService: GroupsListService) {}

  ngOnInit(): void {
    this.groupsListService.getGroupsList('initial');
  }

  updateGroups() {
    this.groupsListService.getGroupsList();
    this.groupsListService.setTimer();
  }

  openDialog() {
    this.groupsListService.createNewGroup();
  }
}
