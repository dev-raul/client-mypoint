
interface IdAndTimesTamps{
  id: number;
  created_at: string;
  updated_at: string;
}
export interface ISession {
  type: string;
  token: string;
  refreshToken: string | null;
  user: IUser;
}
export interface IUserStorage {
  id: number;
  name: string;
  surname: string;
  email: string;
  profile: string;
  
}
export interface IUser extends IdAndTimesTamps {
  name: string;
  surname: string;
  email: string;
  profile: string;

}
export interface IProfilePost {
  profile: string;
}
