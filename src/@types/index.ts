export interface ISession {
  type: string;
  token: string;
  refreshToken: string | null;
  user: IUser;
}
export interface IUser {
  name: string;
  surname: string;
  email: string;
}
