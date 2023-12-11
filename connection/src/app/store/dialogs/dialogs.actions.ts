import { createAction } from '@ngrx/store';
import { IMessageViewModel } from '../../api/model/group-dialog';

export const messagesLoaded = createAction(
  '[Dialog] Messages Loaded',
  ({ groupId, messages }): { groupId: string; messages: IMessageViewModel[] } => ({
    groupId,
    messages,
  }),
);

export const messagesAdded = createAction(
  '[Dialog] Messages Added',
  ({ groupId, messages }): { groupId: string; messages: IMessageViewModel[] } => ({
    groupId,
    messages,
  }),
);
