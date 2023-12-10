import { createReducer, on } from '@ngrx/store';
import { Dialogs } from '../store.model';
import { messagesLoaded } from './dialogs.actions';
import { IMessageViewModel } from '../../api/model/group-dialog';

export const initialState: Dialogs = {};

export const dialogsReducer = createReducer(
  initialState,
  on(
    messagesLoaded,
    (
      state: Dialogs,
      { groupId, messages }: { groupId: string; messages: IMessageViewModel[] },
    ): Dialogs => {
      return {
        ...state,
        [groupId]: { groupId, messages },
      };
    },
  ),
  // on(
  //   groupCreated,
  //   (state: IGroupViewModel[], { group }: { group: IGroupViewModel }): IGroupViewModel[] => [
  //     group,
  //     ...state,
  //   ],
  // ),
  // on(groupDeleted, (state: IGroupViewModel[], { id }: { id: string }): IGroupViewModel[] => {
  //   return state.filter((group) => group.id !== id);
  // }),
);
