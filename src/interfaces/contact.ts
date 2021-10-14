export interface IContact {
  _id: string;
  name: string;
  email: string;
  owner: string;
  dials: { kind: string; dial: string }[];
}

export interface AddContactDTO {
  name: string;
  email?: string;
  dials: { kind: string; dial: string }[];
}
