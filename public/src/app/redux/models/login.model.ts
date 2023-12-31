import { UserInterface } from '../../user/User';

export interface LoginUser {
  logged: false;
  access_token: string;
  refresh_token: string;
  authenticated: false;
  dashboard: object;
  user: UserInterface;
}
