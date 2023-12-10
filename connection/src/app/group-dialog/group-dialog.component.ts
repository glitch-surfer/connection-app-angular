import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GroupDialogService } from './services/group-dialog.service';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss',
})
export class GroupDialogComponent implements OnInit {
  timer$ = this.groupDialogService.timer$;

  loading$ = this.groupDialogService.loading$;

  messages$ = this.groupDialogService.messages$;

  constructor(
    private groupDialogService: GroupDialogService,
    private router: ActivatedRoute,
  ) {}

  onUpdateMessages(): void {
    this.groupDialogService.setTimer();
    this.groupDialogService.getMessages();
  }

  ngOnInit(): void {
    this.groupDialogService.groupId = this.router.snapshot.params['id'];
    this.groupDialogService.getMessages('initial');
  }
}
