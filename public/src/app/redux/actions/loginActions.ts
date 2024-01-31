import { Action } from '@ngrx/store';
import { LoginUser } from '../models/login.model';


export const LOGIN_USER: string = '[LOGIN] ADD';
export const REMOVE_USER: string = '[LOGIN] REMOVE';


export class AddUser implements Action {
  readonly type: string = LOGIN_USER;
  constructor(public payload: LoginUser) {}

}

export class RemoveUser implements Action {
  readonly type: string = REMOVE_USER;
  constructor(public payload: number) {}
}

export type LoginAction = AddUser | RemoveUser;


