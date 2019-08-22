import { Action } from '@ngrx/store';
import { SetSelectedUser } from '../users/users.actions'
import { Post } from './posts.model';

export const GET_USERS_POSTS_SUCCESS = 'GET_USERS_POSTS_SUCCESS';
export const GET_USERS_POSTS_ERROR = 'GET_USERS_POSTS_ERROR';
export const SHOW_ALL_POST = 'SHOW_ALL_POST';

export class GetUsersPostsSuccess implements Action {
    readonly type = GET_USERS_POSTS_SUCCESS;
    constructor(public payload: Post[]) { }
}

export class GetUsersPostsError implements Action {
    readonly type = GET_USERS_POSTS_ERROR;
    constructor(public payload: any) { }
}

export class ShowAllPost implements Action {
    readonly type = SHOW_ALL_POST;
}

export type PostsActions = GetUsersPostsSuccess | GetUsersPostsError | ShowAllPost | SetSelectedUser;