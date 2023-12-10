import { ConversationDTO, IPeopleViewModel, PeopleDTO } from '../../../api/model/peoples';

export const peoplesMapper = (
  peoples: PeopleDTO,
  conversations: ConversationDTO,
): IPeopleViewModel[] => {
  return peoples.Items.map((people) => ({
    uid: people.uid.S,
    name: people.name.S,
    conversationId:
      conversations.Items.find((conversation) => conversation.companionID.S === people.uid.S)?.id
        .S ?? null,
  }));
};
