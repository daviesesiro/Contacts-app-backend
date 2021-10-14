export interface IUser {
  _id: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  dials: { kind: string; dial: string }[];
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserRegisterDTO {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
