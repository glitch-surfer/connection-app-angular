import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GroupDialogService } from './services/group-dialog.service';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss',
})
export class GroupDialogComponent implements OnInit {
  newMessage = new FormControl('', { validators: [Validators.required] });

  timer$ = this.groupDialogService.timer$;

  loading$ = this.groupDialogService.loading$;

  messages$ = this.groupDialogService.messages$;

  groupAuthorId$ = this.groupDialogService.groupAuthorId$;

  userId$ = this.groupDialogService.userId$;

  constructor(
    private groupDialogService: GroupDialogService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.groupDialogService.groupId = this.router.snapshot.params['id'];
    this.groupDialogService.initDialog();
  }

  onUpdateMessages(): void {
    this.groupDialogService.setTimer();
    this.groupDialogService.getMessages();
  }

  onDeleteGroup(): void {
    this.groupDialogService.deleteGroup();
  }

  onSendMessage(): void {
    if (this.newMessage.invalid || !this.newMessage.value) {
      return;
    }

    this.groupDialogService.sendMessage(this.newMessage.value);

    this.newMessage.setValue('');
  }
}
