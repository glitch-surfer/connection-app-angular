import { ProfileDTO } from '../../api/model/profile';
import { Profile } from '../../store/store.model';

export const profileMapper = ({ name, email, uid, createdAt }: ProfileDTO): Profile => {
  return {
    name: name.S,
    email: email.S,
    uid: uid.S,
    createdAt: createdAt.S,
  };
};
