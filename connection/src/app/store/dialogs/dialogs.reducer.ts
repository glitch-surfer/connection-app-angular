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
      {
        groupId,
        messages,
        since,
      }: { groupId: string; messages: IMessageViewModel[]; since: string },
    ): Dialogs => {
      return {
        ...state,
        [groupId]: { groupId, messages, since },
      };
    },
  ),
  on(
    messagesAdded,
    (
      state: Dialogs,
      {
        groupId,
        messages,
        since,
      }: { groupId: string; messages: IMessageViewModel[]; since: string },
    ): Dialogs => {
      return {
        ...state,
        [groupId]: { groupId, messages: [...state[groupId].messages, ...messages], since },
      };
    },
  ),
  on(groupDeleted, (state: Dialogs, { id }: { id: string }): Dialogs => {
    const newState = { ...state };
    delete newState[id];
    return newState;
  }),
);
