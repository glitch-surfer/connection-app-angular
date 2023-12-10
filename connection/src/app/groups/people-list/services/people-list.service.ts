import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, catchError, finalize, forkJoin, interval, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../store/store.model';
// import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../core/services/notification.service';
import { DEFAULT_TIMER, ONE_SECOND } from '../../consts/timer';
import { selectPeoples } from '../../../store/peoples/peoples.selectors';
import { peoplesLoaded } from '../../../store/peoples/peoples.actions';
import { peoplesMapper } from '../helpers/peoples-mapper';
import { PeopleHttpService } from '../../../api/people.service';
import { AuthService } from '../../../api/auth.service';
import { IPeopleViewModel } from '../../../api/model/peoples';
import { Notifications } from '../../../api/consts/notifications';

@Injectable({
  providedIn: 'root',
})
export class PeopleListService {
  peoples$ = (this.store as Store<AppState>).select(selectPeoples);

  // userId$ = this.profileService.profile$.pipe(map((profile) => profile?.uid));

  private timer$$ = new BehaviorSubject<number>(0);

  timer$ = this.timer$$.asObservable();

  private isInitialLoading = true;

  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  get timer(): number {
    return this.timer$$.getValue();
  }

  constructor(
    private peoplesHttpService: PeopleHttpService,
    private store: Store,
    private router: Router,
    // private dialog: MatDialog,
    private notificationService: NotificationService,
    // private profileService: ProfileControllerService,
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

  initPeoplesList(): void {
    this.getPeoplesList('initial');
    // this.profileService.getProfile();
  }

  getPeoplesList(loadingState?: 'initial'): void {
    if (loadingState === 'initial' && !this.isInitialLoading) {
      return;
    }

    this.loading$$.next(true);

    forkJoin([
      this.peoplesHttpService.getPeoplesList(),
      this.peoplesHttpService.getConversationsList(),
    ])
      .pipe(
        map(([peoples, conversations]) => peoplesMapper(peoples, conversations)),
        map((peoples) => {
          const currentUserUid = AuthService.getCredentials().uid;
          return peoples.filter((people) => people.uid !== currentUserUid);
        }),
        tap((peoples) => this.store.dispatch(peoplesLoaded({ peoples }))),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();

    this.isInitialLoading = false;
  }

  goToConversation({ uid, conversationId }: IPeopleViewModel): void {
    if (conversationId) {
      this.router.navigate(['/conversation', conversationId]);
      return;
    }

    this.loading$$.next(true);

    this.peoplesHttpService
      .createConversation(uid)
      .pipe(
        tap((newConversationId) =>
          this.router.navigate(['/conversation', newConversationId.conversationID]),
        ),
        tap(() => this.notificationService.success(Notifications.SUCCESS_CREATE_CONVERSATION)),
        catchError(() => {
          this.notificationService.error(Notifications.ERROR_CREATE_CONVERSATION);
          return EMPTY;
        }),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();
  }

  // openCreateGroupDialog(): void {
  //   this.dialog.open(NewGroupDialogComponent);
  // }

  // deleteGroup(id: string): void {
  //   this.dialog
  //     .open(ConfirmationComponent, {
  //       data: {
  //         title: 'Delete group',
  //         content: 'Are you sure you want to delete this group?',
  //         confirmButtonText: 'Delete',
  //       },
  //     })
  //     .afterClosed()
  //     .pipe(
  //       filter(Boolean),
  //       tap(() => this.loading$$.next(true)),
  //       switchMap(() => this.groupHttpService.deleteGroup(id)),
  //       tap(() => this.store.dispatch(groupDeleted({ id }))),
  //       tap(() => this.notificationService.success(Notifications.SUCCESS_DELETED_GROUP)),
  //       catchError(() => {
  //         this.notificationService.error(Notifications.ERROR_DELETED_GROUP);
  //         return EMPTY;
  //       }),
  //       finalize(() => this.loading$$.next(false)),
  //     )
  //     .subscribe();
  // }
}
