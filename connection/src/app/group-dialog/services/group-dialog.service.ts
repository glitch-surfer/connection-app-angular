import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, interval, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { GroupHttpService } from '../../api/group.service';
import { MessagesMapper } from '../helpers/messages-mapper';
import { AppState } from '../../store/store.model';
import { DEFAULT_TIMER, ONE_SECOND } from '../../groups/consts/timer';
import { messagesLoaded } from '../../store/dialogs/dialogs.actions';
import { selectDialogs } from '../../store/dialogs/dialogs.selectors';

@Injectable({
  providedIn: 'root',
})
export class GroupDialogService {
  groupId: string = '';

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

  private isInitialLoading = true;

  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  get timer(): number {
    return this.timer$$.getValue();
  }

  constructor(
    private groupsHttpService: GroupHttpService,
    private store: Store,
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

  getMessages(loadingState?: 'initial'): void {
    if (loadingState === 'initial' && !this.isInitialLoading) {
      return;
    }

    this.loading$$.next(true);

    this.groupsHttpService
      .getMessages(this.groupId)
      .pipe(
        map((messages) => MessagesMapper(messages)),
        tap((messages) => this.store.dispatch(messagesLoaded({ groupId: this.groupId, messages }))),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();

    this.isInitialLoading = false;
  }
}
