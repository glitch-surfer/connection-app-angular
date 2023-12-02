import { createReducer, on } from '@ngrx/store';
import { Profile } from '../store.model';
import { profileLoaded } from './profile.actions';

export const initialState: Profile = {
  name: '',
  email: '',
  uid: '',
  createdAt: '',
};

export const profileReducer = createReducer(
  initialState,
  on(profileLoaded, (_, { profile }): Profile => ({ ...profile })),
);
