import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, interval, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { GroupHttpService } from '../../../api/group.service';
import { groupsMapper } from '../helpers/group-mapper';
import { groupsLoaded } from '../../../store/groups/groups.actions';
import { selectGroups } from '../../../store/groups/groups.selectors';
import { AppState } from '../../../store/store.model';

const ONE_SECOND = 1000;
const DEFAULT_TIMER = 6;

@Injectable({
  providedIn: 'root',
})
export class GroupsListService {
  groups$ = (this.store as Store<AppState>).select(selectGroups);

  private timer$$ = new BehaviorSubject<number>(0);

  timer$ = this.timer$$.asObservable();

  private isInitialLoading = true;

  // todo add loading
  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  get timer(): number {
    return this.timer$$.getValue();
  }

  constructor(
    private groupHttpService: GroupHttpService,
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

  getGroupsList(loadingState?: 'initial'): void {
    if (loadingState === 'initial' && !this.isInitialLoading) {
      return;
    }

    this.loading$$.next(true);

    this.groupHttpService
      .getGroupsList()
      .pipe(
        map((groups) => groupsMapper(groups)),
        tap((groups) => this.store.dispatch(groupsLoaded({ groups }))),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();

    this.isInitialLoading = false;
  }
}
