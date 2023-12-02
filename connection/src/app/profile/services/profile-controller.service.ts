import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, filter, finalize, map, tap } from 'rxjs';
import { ProfileHttpService } from '../../api/profile.service';
import { selectProfile } from '../../store/profile/profile.selectors';
import { AppState, Profile } from '../../store/store.model';
import { profileLoaded } from '../../store/profile/profile.actions';
import { profileMapper } from '../hekpers/profile-mapper';

@Injectable({
  providedIn: 'root',
})
export class ProfileControllerService {
  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  constructor(
    private http: ProfileHttpService,
    private store: Store,
  ) {}

  getProfile(): Observable<Profile> {
    return (this.store as Store<AppState>).select(selectProfile).pipe(
      filter(Boolean),
      tap((profile) => {
        if (!profile.uid) {
          this.loading$$.next(true);
          this.http
            .getProfile()
            .pipe(
              map(profileMapper),
              tap((profileData) => {
                this.store.dispatch(profileLoaded({ profile: profileData }));
              }),
              finalize(() => this.loading$$.next(false)),
            )
            .subscribe();
        }
      }),
    );
  }
}
