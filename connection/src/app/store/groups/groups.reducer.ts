import { createReducer, on } from '@ngrx/store';
import { groupCreated, groupDeleted, groupsLoaded } from './groups.actions';
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
  on(
    groupCreated,
    (state: IGroupViewModel[], { group }: { group: IGroupViewModel }): IGroupViewModel[] => [
      group,
      ...state,
    ],
  ),
  on(groupDeleted, (state: IGroupViewModel[], { id }: { id: string }): IGroupViewModel[] => {
    return state.filter((group) => group.id !== id);
  }),
);
