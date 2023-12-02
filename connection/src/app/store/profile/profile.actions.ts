import { createAction } from '@ngrx/store';
import { Profile } from '../store.model';

export const profileLoaded = createAction(
  '[Profile] Profile Loaded',
  ({ profile }): { profile: Profile } => ({
    profile,
  }),
);
