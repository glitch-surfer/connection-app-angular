import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, catchError, finalize, interval, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroupHttpService } from '../../api/group.service';
import { MessagesMapper } from '../helpers/messages-mapper';
import { AppState } from '../../store/store.model';
import { DEFAULT_TIMER, ONE_SECOND } from '../../groups/consts/timer';
import { messagesAdded, messagesLoaded } from '../../store/dialogs/dialogs.actions';
import { selectDialogs } from '../../store/dialogs/dialogs.selectors';
import { selectProfile } from '../../store/profile/profile.selectors';
import { selectGroups } from '../../store/groups/groups.selectors';
import { Notifications } from '../../api/consts/notifications';
import { NotificationService } from '../../core/services/notification.service';
import { groupDeleted } from '../../store/groups/groups.actions';

@Injectable({
  providedIn: 'root',
})
export class GroupDialogService {
  private readonly since: { [key: string]: string } = {};

  groupId: string = '';

  groupAuthorId$ = (this.store as Store<AppState>)
    .select(selectGroups)
    .pipe(map((groups) => groups.find((group) => group.id === this.groupId)?.createdBy || ''));

  userId$ = (this.store as Store<AppState>)
    .select(selectProfile)
    .pipe(map((profile) => profile.uid));

  messages$ = (this.store as Store<AppState>).select(selectDialogs).pipe(
    map((dialogs) => {
      if (!dialogs[this.groupId]) {
        return [];
      }
      return dialogs[this.groupId].messages;
    }),
  );

  private timer$$ = new BehaviorSubject<number>(0);

  timer$ = this.timer$$.asObservable();

  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  get timer(): number {
    return this.timer$$.getValue();
  }

  constructor(
    private groupsHttpService: GroupHttpService,
    private store: Store,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  setTimer(): void {
    if (this.timer !== 0) {
      return;
    }

    this.timer$$.next(DEFAULT_TIMER);

    const interval$ = interval(ONE_SECOND).subscribe(() => {
      if (this.timer === 0) {
        interval$.unsubscribe();
        return;
      }

      this.timer$$.next(this.timer - 1);
    });
  }

  getMessages(): void {
    this.loading$$.next(true);

    this.groupsHttpService
      .getMessages(this.groupId, this.since[this.groupId] ?? '')
      .pipe(
        map((messages) => MessagesMapper(messages)),
        tap((messages) => {
          const isInitialLoading = Boolean(!this.since[this.groupId]);

          if (messages.length > 0) {
            this.since[this.groupId] = messages[messages.length - 1].createdAt;
          }

          (this.store as Store<AppState>).dispatch(
            isInitialLoading
              ? messagesLoaded({
                  groupId: this.groupId,
                  messages,
                  since: this.since[this.groupId] ?? '',
                })
              : messagesAdded({
                  groupId: this.groupId,
                  messages,
                  since: this.since[this.groupId] ?? '',
                }),
          );
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();
  }

  deleteGroup(): void {
    this.loading$$.next(true);

    this.groupsHttpService
      .deleteGroup(this.groupId)
      .pipe(
        tap(() => (this.store as Store<AppState>).dispatch(groupDeleted({ id: this.groupId }))),
        tap(() => this.notificationService.success(Notifications.SUCCESS_DELETED_GROUP)),
        tap(() => this.router.navigate(['/'])),
        catchError(() => {
          this.notificationService.error(Notifications.ERROR_DELETED_GROUP);
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();
  }
}
