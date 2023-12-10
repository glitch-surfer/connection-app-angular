import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { PeopleListComponent } from './people-list/people-list.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, GroupsListComponent, PeopleListComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent {}
