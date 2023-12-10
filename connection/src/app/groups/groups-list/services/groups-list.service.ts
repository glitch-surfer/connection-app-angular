import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  filter,
  finalize,
  interval,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { GroupHttpService } from '../../../api/group.service';
import { groupsMapper } from '../helpers/group-mapper';
import { groupCreated, groupsLoaded } from '../../../store/groups/groups.actions';
import { selectGroups } from '../../../store/groups/groups.selectors';
import { AppState, Profile } from '../../../store/store.model';
import { NewGroupDialogComponent } from '../new-group-dialog/new-group-dialog.component';
import { NotificationService } from '../../../core/services/notification.service';
import { Notifications } from '../../../api/consts/notifications';
import { CreateGroupResponse, IGroupViewModel } from '../../../api/model/groups';
import { ProfileControllerService } from '../../../profile/services/profile-controller.service';

const ONE_SECOND = 1000;
const DEFAULT_TIMER = 6;

@Injectable({
  providedIn: 'root',
})
export class GroupsListService {
  groups$ = (this.store as Store<AppState>).select(selectGroups);

  userId$ = this.profileService.profile$.pipe(map((profile) => profile?.uid));

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
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private profileService: ProfileControllerService,
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

  initGroupsList(): void {
    this.getGroupsList('initial');
    this.profileService.getProfile();
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

  createNewGroup() {
    this.dialog
      .open(NewGroupDialogComponent)
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.loading$$.next(true)),
        switchMap((name: string) =>
          this.groupHttpService.createGroup(name).pipe(
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
          ),
        ),
      )
      .subscribe();
  }
}
