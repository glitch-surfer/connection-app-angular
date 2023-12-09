import { createReducer, on } from '@ngrx/store';
import { groupsLoaded } from './groups.actions';
import { IGroupViewModel } from '../../api/model/groups';

export const initialState: IGroupViewModel[] = [];

export const groupsReducer = createReducer(
  initialState,
  on(
    groupsLoaded,
    (_: IGroupViewModel[], { groups }: { groups: IGroupViewModel[] }): IGroupViewModel[] => [
      ...groups,
    ],
  ),
);
