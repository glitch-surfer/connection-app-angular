import { IMessageViewModel } from './group-dialog';

export interface Conversation {
  conversationId: string;
  messages: IMessageViewModel[];
}

export interface Conversations {
  [key: string]: Conversation;
}
