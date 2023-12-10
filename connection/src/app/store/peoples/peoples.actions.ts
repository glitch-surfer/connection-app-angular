import { createAction } from '@ngrx/store';
import { IPeopleViewModel } from '../../api/model/peoples';

export const peoplesLoaded = createAction(
  '[Peoples] Peoples Loaded',
  ({ peoples }): { peoples: IPeopleViewModel[] } => ({
    peoples,
  }),
);

// export const peoplesCreated = createAction(
//   '[Peoples] People Created',
//   ({ peoples }: { peoples: IPeopleViewModel }): { peoples: IPeopleViewModel } => ({
//     peoples,
//   }),
// );

// export const peoplesDeleted = createAction(
//   '[Peoples] People Deleted',
//   ({ id }: { id: string }): { id: string } => ({
//     id,
//   }),
// );
