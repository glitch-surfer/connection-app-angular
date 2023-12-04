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
import { Router } from '@angular/router';
import { ProfileHttpService } from '../../api/profile.service';
import { selectProfile } from '../../store/profile/profile.selectors';
import { AppState, Profile } from '../../store/store.model';
import { profileLoaded } from '../../store/profile/profile.actions';
import { profileMapper } from '../hekpers/profile-mapper';
import { NotificationService } from '../../core/services/notification.service';
import { Notifications } from '../../api/consts/notifications';
import { AuthService } from '../../api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileControllerService implements OnDestroy {
  private subscription: Subscription[] = [];

  private loading$$ = new BehaviorSubject<boolean>(true);

  loading$ = this.loading$$.asObservable();

  constructor(
    private http: ProfileHttpService,
    private store: Store,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) {}

  getProfile(): Observable<Profile> {
    return (this.store as Store<AppState>).select(selectProfile).pipe(
      filter(Boolean),
      switchMap((profile) => {
        if (profile.uid === '') {
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
      finalize(() => this.loading$$.next(false)),
    );
  }

  updateProfileName(name: string, profile: Profile): void {
    this.loading$$.next(true);

    const subscription = this.http
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

    this.subscription.push(subscription);
  }

  logout(): void {
    this.loading$$.next(true);

    const subscription = this.authService
      .signOut()
      .pipe(
        catchError((err) => {
          this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
          return EMPTY;
        }),
        tap(() => this.notificationService.success(Notifications.SUCCESS_LOGOUT)),
        tap(() => this.store.dispatch(profileLoaded({ profile: { uid: '' } }))),
        tap(() => this.router.navigate(['/signin'])),
        tap(() => AuthService.removeCredentials()),
        finalize(() => this.loading$$.next(false)),
      )
      .subscribe();

    this.subscription.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
