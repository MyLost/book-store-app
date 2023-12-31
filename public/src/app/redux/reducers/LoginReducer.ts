import { LoginUser } from '../models/login.model';
import * as LoginAction from '../actions/loginActions';
import { LoginState } from '../store/login.state';

const loginState: LoginState = {loginData: {} as LoginUser};

function addUser(state: LoginUser[], user) {
  return [...state, user];
}

export function loginReducer(
  state: LoginState = { loginData: {} as LoginUser },
  action: LoginAction.LoginAction): LoginUser {
    switch (action.type) {
      case LoginAction.LOGIN_USER:
        return Object.assign({} as LoginUser, state, action.payload );
      default:
      return {} as LoginUser;
    }
  }
