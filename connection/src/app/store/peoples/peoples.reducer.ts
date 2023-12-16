import { createReducer, on } from '@ngrx/store';
import { IPeopleViewModel } from '../../api/model/peoples';
import { peoplesConversationCreated, peoplesLoaded } from './peoples.actions';
import { conversationDeleted } from '../conversation/conversation.actions';

export const initialState: IPeopleViewModel[] = [];

export const peoplesReducer = createReducer(
  initialState,
  on(
    peoplesLoaded,
    (_: IPeopleViewModel[], { peoples }: { peoples: IPeopleViewModel[] }): IPeopleViewModel[] => [
      ...peoples,
    ],
  ),
  on(
    peoplesConversationCreated,
    (
      state: IPeopleViewModel[],
      { conversationID, uid }: { conversationID: string; uid: string },
    ): IPeopleViewModel[] => {
      return state.map((people) => {
        if (people.uid === uid) {
          return {
            ...people,
            conversationId: conversationID,
          };
        }
        return people;
      });
    },
  ),
  on(
    conversationDeleted,
    (state: IPeopleViewModel[], { id }: { id: string }): IPeopleViewModel[] => {
      return state.map((people) => {
        if (people.conversationId === id) {
          return {
            ...people,
            conversationId: null,
          };
        }
        return people;
      });
    },
  ),
);
