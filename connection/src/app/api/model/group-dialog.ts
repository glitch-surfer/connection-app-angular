export interface MessageDTO {
  authorID: {
    S: string;
  };
  message: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface DialogDTO {
  Count: number;
  Items: MessageDTO[];
}

export interface IMessageViewModel {
  authorID: string;
  message: string;
  createdAt: string;
}

export interface Dialog {
  groupId: string;
  messages: IMessageViewModel[];
}
