export interface Group {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}

export interface GroupDTO {
  Count: number;
  Items: Group[];
}

export interface IGroupViewModel {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}
