import { IGroupViewModel } from '../api/model/groups';

export interface Profile {
  name: string;
  email: string;
  uid: string;
  createdAt: string;
}

export interface AppState {
  profile: Profile;
  groups: IGroupViewModel[];
}
