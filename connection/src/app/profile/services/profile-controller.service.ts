import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Subscription, catchError, finalize, map, tap } from 'rxjs';
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
  private profile: Profile | null = null;

  private subscription: Subscription[] = [];

  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  profile$ = (this.store as Store<AppState>).select(selectProfile);

  constructor(
    private http: ProfileHttpService,
    private store: Store,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) {}

  getProfile(): Profile | null {
    if (this.profile) {
      return this.profile;
    }

    this.loading$$.next(true);

    this.http
      .getProfile()
      .pipe(
        map(profileMapper),
        tap((profileData) => this.store.dispatch(profileLoaded({ profile: profileData }))),
        tap((profileData) => {
          this.profile = profileData;
        }),
        finalize(() => this.loading$$.next(false)),
        catchError((err) => {
          this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
          return EMPTY;
        }),
      )
      .subscribe();

    return null;
  }

  updateProfileName(name: string, profile: Profile): void {
    this.loading$$.next(true);

    const newProfile = { ...profile, name };

    const subscription = this.http
      .updateProfileName(name)
      .pipe(
        tap(() => this.store.dispatch(profileLoaded({ profile: newProfile }))),
        tap(() => {
          this.profile = newProfile;
        }),
        tap(() => this.notificationService.success(Notifications.SUCCESS_PROFILE_NAME)),
        catchError((err) => {
          this.notificationService.error(err.error.message || Notifications.UNKNOWN_ERROR);
          return EMPTY;
        }),
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
        tap(() => {
          this.profile = null;
        }),
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
