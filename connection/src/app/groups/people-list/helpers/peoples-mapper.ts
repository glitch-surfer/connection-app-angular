import { IPeopleViewModel, PeopleDTO } from '../../../api/model/peoples';

export const peoplesMapper = (peoples: PeopleDTO): IPeopleViewModel[] => {
  return peoples.Items.map((people) => ({
    uid: people.uid.S,
    name: people.name.S,
  }));
};
