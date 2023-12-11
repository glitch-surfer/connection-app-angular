import { createReducer, on } from '@ngrx/store';
import { Dialogs } from '../store.model';
import { messagesAdded, messagesLoaded } from './dialogs.actions';
import { IMessageViewModel } from '../../api/model/group-dialog';
import { groupDeleted } from '../groups/groups.actions';

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
  on(
    messagesAdded,
    (
      state: Dialogs,
      { groupId, messages }: { groupId: string; messages: IMessageViewModel[] },
    ): Dialogs => {
      return {
        ...state,
        [groupId]: { groupId, messages: [...state[groupId].messages, ...messages] },
      };
    },
  ),
  on(groupDeleted, (state: Dialogs, { id }: { id: string }): Dialogs => {
    const newState = { ...state };
    delete newState[id];
    return newState;
  }),
);
