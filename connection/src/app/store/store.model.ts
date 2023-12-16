import { Conversations } from '../api/model/conversation';
import { Dialogs } from '../api/model/group-dialog';
import { IGroupViewModel } from '../api/model/groups';
import { IPeopleViewModel } from '../api/model/peoples';

export interface Profile {
  name: string;
  email: string;
  uid: string;
  createdAt: string;
}

export interface AppState {
  profile: Profile;
  groups: IGroupViewModel[];
  peoples: IPeopleViewModel[];
  dialogs: Dialogs;
  conversations: Conversations;
}
