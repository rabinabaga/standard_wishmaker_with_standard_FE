export interface UserFromDb {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
}

export interface UserFromDbDuringUpdate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface UserFromDbDuringRegister {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}

export interface createUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
}
export interface loginUser {
  email: string;
  password: string;
}

export interface errObject {
  error: string;
}
export interface loginGoogleUser {
  credential:string;
}

export interface sendVerifyEmail {
  email: string;
  token: string;
  baseUrl: string;
}
