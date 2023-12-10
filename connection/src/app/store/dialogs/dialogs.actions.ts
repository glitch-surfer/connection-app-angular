import { createAction } from '@ngrx/store';
import { IMessageViewModel } from '../../api/model/group-dialog';

export const messagesLoaded = createAction(
  '[Dialog] Messages Loaded',
  ({
    groupId,
    messages,
    since,
  }): { groupId: string; messages: IMessageViewModel[]; since: string } => ({
    groupId,
    messages,
    since,
  }),
);

export const messagesAdded = createAction(
  '[Dialog] Messages Added',
  ({
    groupId,
    messages,
    since,
  }): { groupId: string; messages: IMessageViewModel[]; since: string } => ({
    groupId,
    messages,
    since,
  }),
);
