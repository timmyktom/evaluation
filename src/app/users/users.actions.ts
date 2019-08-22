import { Action } from '@ngrx/store';
import { User } from './users.model';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const SET_SELECTED_USER = 'SET_SELECTED_USER';

export class GetUsers implements Action {
    readonly type = GET_USERS;
}

export class GetUsersSuccess implements Action {
    readonly type = GET_USERS_SUCCESS;
    constructor(public payload: User[]) { }
}

export class GetUsersError implements Action {
    readonly type = GET_USERS_ERROR;
    constructor(public payload: any) { }
}

export class SetSelectedUser implements Action {
    readonly type = SET_SELECTED_USER;
    constructor(public payload: number) { }
}

export type UsersActions = GetUsers | GetUsersSuccess | GetUsersError | SetSelectedUser;
