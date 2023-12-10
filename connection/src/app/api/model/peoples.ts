export interface People {
  uid: { S: string };
  name: { S: string };
}

export interface PeopleDTO {
  Count: number;
  Items: People[];
}

export interface IPeopleViewModel {
  uid: string;
  name: string;
  conversationId: string | null;
}

export interface Conversation {
  id: { S: string };
  companionID: { S: string };
}

export interface ConversationDTO {
  Count: number;
  Items: Conversation[];
}

export interface NewConversation {
  conversationID: string;
}
