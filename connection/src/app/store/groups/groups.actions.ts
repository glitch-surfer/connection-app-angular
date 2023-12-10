import { createAction } from '@ngrx/store';
import { IGroupViewModel } from '../../api/model/groups';

export const groupsLoaded = createAction(
  '[Groups] Groups Loaded',
  ({ groups }): { groups: IGroupViewModel[] } => ({
    groups,
  }),
);

export const groupCreated = createAction(
  '[Groups] Group Created',
  ({ group }: { group: IGroupViewModel }): { group: IGroupViewModel } => ({
    group,
  }),
);

export const groupDeleted = createAction(
  '[Groups] Group Deleted',
  ({ id }: { id: string }): { id: string } => ({
    id,
  }),
);
