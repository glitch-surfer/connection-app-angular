import { DialogDTO, IMessageViewModel } from '../../api/model/group-dialog';

export const MessagesMapper = (messages: DialogDTO): IMessageViewModel[] => {
  return messages.Items.map((message) => ({
    authorID: message.authorID.S,
    message: message.message.S,
    createdAt: message.createdAt.S,
  }));
};
