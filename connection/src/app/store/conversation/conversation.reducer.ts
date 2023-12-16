import { createReducer, on } from '@ngrx/store';
import {
  conversationDeleted,
  conversationMessagesAdded,
  conversationMessagesLoaded,
} from './conversation.actions';
import { IMessageViewModel } from '../../api/model/group-dialog';
import { Conversations } from '../../api/model/conversation';

export const initialState: Conversations = {};

export const conversationsReducer = createReducer(
  initialState,
  on(
    conversationMessagesLoaded,
    (
      state: Conversations,
      { conversationId, messages }: { conversationId: string; messages: IMessageViewModel[] },
    ): Conversations => {
      return {
        ...state,
        [conversationId]: { conversationId, messages },
      };
    },
  ),
  on(
    conversationMessagesAdded,
    (
      state: Conversations,
      { conversationId, messages }: { conversationId: string; messages: IMessageViewModel[] },
    ): Conversations => {
      return {
        ...state,
        [conversationId]: {
          conversationId,
          messages: [...state[conversationId].messages, ...messages],
        },
      };
    },
  ),
  on(conversationDeleted, (state: Conversations, { id }: { id: string }): Conversations => {
    const newState = { ...state };
    delete newState[id];
    return newState;
  }),
);
