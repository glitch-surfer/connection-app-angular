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
}
