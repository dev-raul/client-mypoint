export interface ISession {
  type: string;
  token: string;
  refreshToken: string | null;
}
