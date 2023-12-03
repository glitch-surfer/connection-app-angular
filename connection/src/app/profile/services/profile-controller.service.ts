import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subscription,
  catchError,
  filter,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ProfileHttpService } from '../../api/profile.service';
import { selectProfile } from '../../store/profile/profile.selectors';
import { AppState, Profile } from '../../store/store.model';
import { profileLoaded } from '../../store/profile/profile.actions';
import { profileMapper } from '../hekpers/profile-mapper';
import { NotificationService } from '../../core/services/notification.service';
import { Notifications } from '../../api/consts/notifications';

@Injectable({
  providedIn: 'root',
})
export class ProfileControllerService implements OnDestroy {
  private subscription: Subscription | null = null;

  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  constructor(
    private http: ProfileHttpService,
    private store: Store,
    private notificationService: NotificationService,
  ) {}

  getProfile(): Observable<Profile> {
    return (this.store as Store<AppState>).select(selectProfile).pipe(
      filter(Boolean),
      switchMap((profile) => {
        if (profile.uid === '') {
          this.loading$$.next(true);
          return this.http.getProfile().pipe(
            map(profileMapper),
            tap((profileData) => this.store.dispatch(profileLoaded({ profile: profileData }))),
            catchError((err) => {
              this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
              return of(profile);
            }),
            finalize(() => this.loading$$.next(false)),
          );
        }

        return of(profile);
      }),
    );
  }

  updateProfileName(name: string, profile: Profile): void {
    this.loading$$.next(true);

    this.subscription = this.http
      .updateProfileName(name)
      .pipe(
        catchError((err) => {
          this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
          return EMPTY;
        }),
        tap(() => this.store.dispatch(profileLoaded({ profile: { ...profile, name } }))),
        tap(() => this.notificationService.success(Notifications.SUCCESS_PROFILE_NAME)),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
