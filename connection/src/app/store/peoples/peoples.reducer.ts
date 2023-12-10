import { createReducer, on } from '@ngrx/store';
import { IPeopleViewModel } from '../../api/model/peoples';
import { peoplesLoaded } from './peoples.actions';

export const initialState: IPeopleViewModel[] = [];

export const peoplesReducer = createReducer(
  initialState,
  on(
    peoplesLoaded,
    (_: IPeopleViewModel[], { peoples }: { peoples: IPeopleViewModel[] }): IPeopleViewModel[] => [
      ...peoples,
    ],
  ),
  // on(
  //   peopleCreated,
  //   (state: IPeopleViewModel[], { people }: { people: IPeopleViewModel }): IPeopleViewModel[] => [
  //     people,
  //     ...state,
  //   ],
  // ),
  // on(peopleDeleted, (state: IPeopleViewModel[], { uid }: { uid: string }): IPeopleViewModel[] => {
  //   return state.filter((people) => people.uid !== uid);
  // }),
);
