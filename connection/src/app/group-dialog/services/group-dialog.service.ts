import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  combineLatest,
  filter,
  finalize,
  interval,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { GroupHttpService } from '../../api/group.service';
import { MessagesMapper } from '../../helpers/messages-mapper';
import { AppState } from '../../store/store.model';
import { DEFAULT_TIMER, ONE_SECOND } from '../../groups/consts/timer';
import { messagesAdded, messagesLoaded } from '../../store/dialogs/dialogs.actions';
import { selectDialogs } from '../../store/dialogs/dialogs.selectors';
import { selectProfile } from '../../store/profile/profile.selectors';
import { selectGroups } from '../../store/groups/groups.selectors';
import { Notifications } from '../../api/consts/notifications';
import { NotificationService } from '../../core/services/notification.service';
import { groupDeleted } from '../../store/groups/groups.actions';
import { IMessageViewModel } from '../../api/model/group-dialog';
import { PeopleListService } from '../../groups/people-list/services/people-list.service';
import { GroupsListService } from '../../groups/groups-list/services/groups-list.service';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';
import { selectPeoples } from '../../store/peoples/peoples.selectors';

@Injectable({
  providedIn: 'root',
})
export class GroupDialogService {
  private readonly since: { [key: string]: string } = {};

  private readonly messagesRaw$ = (this.store as Store<AppState>).select(selectDialogs).pipe(
    map((dialogs) => {
      if (!dialogs[this.groupId]) {
        return [];
      }
      return dialogs[this.groupId].messages;
    }),
  );

  private readonly peoples$ = (this.store as Store<AppState>).select(selectPeoples);

  private readonly loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  groupId: string = '';

  groupAuthorId$ = (this.store as Store<AppState>)
    .select(selectGroups)
    .pipe(map((groups) => groups.find((group) => group.id === this.groupId)?.createdBy));

  userId$ = (this.store as Store<AppState>)
    .select(selectProfile)
    .pipe(map((profile) => profile.uid));

  messages$ = combineLatest([this.messagesRaw$, this.peoples$]).pipe(
    map(([messages, peoples]) => {
      return messages.map((message) => ({
        ...message,
        author: peoples.find((people) => people.uid === message.authorID)?.name ?? 'Me',
      }));
    }),
  );

  timers: { [key: string]: BehaviorSubject<number> } = {};

  constructor(
    private groupsHttpService: GroupHttpService,
    private store: Store,
    private notificationService: NotificationService,
    private router: Router,
    private peopleListService: PeopleListService,
    private groupsListService: GroupsListService,
    private dialog: MatDialog,
  ) {}

  initDialog(): void {
    this.groupsListService.initGroupsList();
    this.peopleListService.initPeoplesList();
    this.getMessages();
  }

  setTimer(): void {
    const timer = this.timers[this.groupId];

    if (timer.getValue()) {
      return;
    }

    let count = DEFAULT_TIMER;

    const interval$ = interval(ONE_SECOND).subscribe(() => {
      if (count === 0) {
        interval$.unsubscribe();
        return;
      }

      count -= 1;

      timer.next(count);
    });
  }

  getMessages(): void {
    this.loading$$.next(true);

    this.groupsHttpService
      .getMessages(this.groupId, this.since[this.groupId] ?? '')
      .pipe(
        map((messages) => MessagesMapper(messages)),
        map((messages) => messages.sort((a, b) => +a.createdAt - +b.createdAt).slice()),
        tap((messages: IMessageViewModel[]) => {
          const isInitialLoading = Boolean(!this.since[this.groupId]);

          if (messages.length > 0) {
            this.since[this.groupId] = messages[messages.length - 1].createdAt;
          }

          (this.store as Store<AppState>).dispatch(
            isInitialLoading
              ? messagesLoaded({
                  groupId: this.groupId,
                  messages,
                })
              : messagesAdded({
                  groupId: this.groupId,
                  messages,
                }),
          );
        }),
        catchError(() => {
          this.notificationService.error(Notifications.ERROR_LOAD_MESSAGES);
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();
  }

  deleteGroup(): void {
    this.dialog
      .open(ConfirmationComponent, {
        data: {
          title: 'Delete group',
          content: 'Are you sure you want to delete this group?',
          confirmButtonText: 'Delete',
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.loading$$.next(true)),
        switchMap(() => this.groupsHttpService.deleteGroup(this.groupId)),
        tap(() => this.store.dispatch(groupDeleted({ id: this.groupId }))),
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

  sendMessage(message: string): void {
    this.loading$$.next(true);

    this.groupsHttpService
      .sendMessage(this.groupId, message)
      .pipe(
        tap(() => this.getMessages()),
        catchError(() => {
          this.notificationService.error(Notifications.ERROR_SEND_MESSAGE);
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();
  }
}
