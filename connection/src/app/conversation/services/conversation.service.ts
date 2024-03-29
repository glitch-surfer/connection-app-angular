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
import { MessagesMapper } from '../../helpers/messages-mapper';
import { AppState } from '../../store/store.model';
import { DEFAULT_TIMER, ONE_SECOND } from '../../groups/consts/timer';
import { selectProfile } from '../../store/profile/profile.selectors';
import { Notifications } from '../../api/consts/notifications';
import { NotificationService } from '../../core/services/notification.service';
import { IMessageViewModel } from '../../api/model/group-dialog';
import { PeopleListService } from '../../groups/people-list/services/people-list.service';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';
import { selectPeoples } from '../../store/peoples/peoples.selectors';
import { selectConversations } from '../../store/conversation/conversation.selectors';
import { PeopleHttpService } from '../../api/people.service';
import {
  conversationDeleted,
  conversationMessagesAdded,
  conversationMessagesLoaded,
} from '../../store/conversation/conversation.actions';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private readonly since: { [key: string]: string } = {};

  private readonly messagesRaw$ = (this.store as Store<AppState>).select(selectConversations).pipe(
    map((conversations) => {
      if (!conversations[this.conversationId]) {
        return [];
      }
      return conversations[this.conversationId].messages;
    }),
  );

  private readonly peoples$ = (this.store as Store<AppState>).select(selectPeoples);

  private readonly loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  conversationId: string = '';

  isConversationExist$ = this.peoples$.pipe(
    map((peoples) => peoples.find((people) => people.conversationId === this.conversationId)),
  );

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
    private conversationHttpService: PeopleHttpService,
    private store: Store,
    private notificationService: NotificationService,
    private router: Router,
    private peopleListService: PeopleListService,
    private dialog: MatDialog,
  ) {}

  initConversation(): void {
    this.peopleListService.initPeoplesList();
    this.getMessages();
  }

  setTimer(): void {
    const timer = this.timers[this.conversationId];

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

    this.conversationHttpService
      .getMessages(this.conversationId, this.since[this.conversationId] ?? '')
      .pipe(
        map((messages) => MessagesMapper(messages)),
        map((messages) => messages.sort((a, b) => +a.createdAt - +b.createdAt).slice()),
        tap((messages: IMessageViewModel[]) => {
          const isInitialLoading = Boolean(!this.since[this.conversationId]);

          if (messages.length > 0) {
            this.since[this.conversationId] = messages[messages.length - 1].createdAt;
          }

          (this.store as Store<AppState>).dispatch(
            isInitialLoading
              ? conversationMessagesLoaded({
                  conversationId: this.conversationId,
                  messages,
                })
              : conversationMessagesAdded({
                  conversationId: this.conversationId,
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

  deleteConversation(): void {
    this.dialog
      .open(ConfirmationComponent, {
        data: {
          title: 'Delete conversation',
          content: 'Are you sure you want to delete this conversation?',
          confirmButtonText: 'Delete',
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.loading$$.next(true)),
        switchMap(() => this.conversationHttpService.deleteConversation(this.conversationId)),
        tap(() => this.store.dispatch(conversationDeleted({ id: this.conversationId }))),
        tap(() => this.notificationService.success(Notifications.SUCCESS_DELETE_CONVERSATION)),
        tap(() => this.router.navigate(['/'])),
        catchError(() => {
          this.notificationService.error(Notifications.ERROR_DELETE_CONVERSATION);
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();
  }

  sendMessage(message: string): void {
    this.loading$$.next(true);

    this.conversationHttpService
      .sendMessage(this.conversationId, message)
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
