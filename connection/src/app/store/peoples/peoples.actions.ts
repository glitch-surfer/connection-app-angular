import { createAction } from '@ngrx/store';
import { IPeopleViewModel } from '../../api/model/peoples';

export const peoplesLoaded = createAction(
  '[Peoples] Peoples Loaded',
  ({ peoples }): { peoples: IPeopleViewModel[] } => ({
    peoples,
  }),
);

export const peoplesConversationCreated = createAction(
  '[Peoples] People Conversation Created',
  ({
    conversationID,
    uid,
  }: {
    conversationID: string;
    uid: string;
  }): { conversationID: string; uid: string } => ({
    conversationID,
    uid,
  }),
);
