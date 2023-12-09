import { createAction } from '@ngrx/store';
import { IGroupViewModel } from '../../api/model/groups';

export const groupsLoaded = createAction(
  '[Groups] Groups Loaded',
  ({ groups }): { groups: IGroupViewModel[] } => ({
    groups,
  }),
);
