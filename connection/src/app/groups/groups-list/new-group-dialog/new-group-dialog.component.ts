import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, map, tap, catchError, EMPTY, BehaviorSubject, finalize } from 'rxjs';
import { GroupHttpService } from '../../../api/group.service';
import { Notifications } from '../../../api/consts/notifications';
import { IGroupViewModel, CreateGroupResponse } from '../../../api/model/groups';
import { groupCreated } from '../../../store/groups/groups.actions';
import { Profile } from '../../../store/store.model';
import { NotificationService } from '../../../core/services/notification.service';
import { ProfileControllerService } from '../../../profile/services/profile-controller.service';

@Component({
  selector: 'app-new-group-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogClose,
  ],
  templateUrl: './new-group-dialog.component.html',
  styleUrl: './new-group-dialog.component.scss',
})
export class NewGroupDialogComponent {
  name = new FormControl('', {
    validators: [Validators.maxLength(30), Validators.pattern('^[a-zA-Zа-яА-Я0-9 ]*$')],
  });

  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  constructor(
    public dialogRef: MatDialogRef<NewGroupDialogComponent>,
    private groupHttpService: GroupHttpService,
    private store: Store,
    private notificationService: NotificationService,
    private profileService: ProfileControllerService,
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onCreateGroup() {
    if (!this.name.value || this.name.invalid) {
      return;
    }

    this.loading$$.next(true);

    this.createNewGroup(this.name.value).subscribe(() => this.dialogRef.close());
  }

  private createNewGroup(name: string): Observable<IGroupViewModel> {
    return this.groupHttpService.createGroup(name).pipe(
      map((res: CreateGroupResponse) => ({
        id: res.groupID,
        profile: this.profileService.getProfile() ?? ({} as Profile),
      })),
      map(
        ({ id, profile }): IGroupViewModel => ({
          id,
          name,
          createdAt: Date.now().toString(),
          createdBy: profile?.uid ?? '',
        }),
      ),
      tap((group) => this.store.dispatch(groupCreated({ group }))),
      tap(() => this.notificationService.success(Notifications.SUCCESS_CREATED_GROUP)),
      finalize(() => this.loading$$.next(false)),
      catchError(() => {
        this.notificationService.error(Notifications.ERROR_CREATED_GROUP);
        return EMPTY;
      }),
    );
  }
}
