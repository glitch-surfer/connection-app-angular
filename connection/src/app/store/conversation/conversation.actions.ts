import { createAction } from '@ngrx/store';
import { IMessageViewModel } from '../../api/model/group-dialog';

export const conversationMessagesLoaded = createAction(
  '[Conversation] Messages Loaded',
  ({ conversationId, messages }): { conversationId: string; messages: IMessageViewModel[] } => ({
    conversationId,
    messages,
  }),
);

export const conversationMessagesAdded = createAction(
  '[Conversation] Messages Added',
  ({ conversationId, messages }): { conversationId: string; messages: IMessageViewModel[] } => ({
    conversationId,
    messages,
  }),
);

export const conversationDeleted = createAction(
  '[Conversation] Conversation Deleted',
  ({ id }: { id: string }): { id: string } => ({
    id,
  }),
);
