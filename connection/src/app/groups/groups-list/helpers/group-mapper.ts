import { GroupDTO, IGroupViewModel } from '../../../api/model/groups';

export const groupsMapper = (groups: GroupDTO): IGroupViewModel[] => {
  return groups.Items.map((group) => ({
    id: group.id.S,
    name: group.name.S,
    createdAt: group.createdAt.S,
    createdBy: group.createdBy.S,
  }));
};
