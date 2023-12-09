import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GroupsListService } from './services/groups-list.service';
import { NewGroupDialogComponent } from './new-group-dialog/new-group-dialog.component';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent {
  groups$ = this.groupsListService.groups$;

  timer$ = this.groupsListService.timer$;

  constructor(
    private groupsListService: GroupsListService,
    private dialog: MatDialog,
  ) {}

  updateGroups() {
    this.groupsListService.setTimer();
    // todo add http refrech req
  }

  openNewGroupDialog() {
    const dialogRef = this.dialog.open(NewGroupDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Dialog result: ${result}`);
      }
    });
  }
}
