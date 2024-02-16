import {LoginUser} from '../models/login.model';

export interface LoginState {
   readonly loginData: LoginUser;
}
