import { Action } from '@ngrx/store';
import { SetSelectedUser } from '../users/users.actions';
import { Post, Comment } from './posts.model';

export const GET_USERS_POSTS_SUCCESS = 'GET_USERS_POSTS_SUCCESS';
export const GET_USERS_POSTS_ERROR = 'GET_USERS_POSTS_ERROR';
export const SHOW_ALL_POST = 'SHOW_ALL_POST';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const GET_POST_COMMENTS_SUCCESS = 'GET_POST_COMMENTS_SUCCESS';
export const GET_POST_COMMENTS_ERROR = 'GET_POST_COMMENTS_ERROR';
export const CLOSE_POST_COMMENTS = 'CLOSE_POST_COMMENTS';

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

export class GetPostComments implements Action {
    readonly type = GET_POST_COMMENTS;
    constructor(public payload: number) { }
}

export class GetPostCommentsSuccess implements Action {
    readonly type = GET_POST_COMMENTS_SUCCESS;
    constructor(public payload: Comment[]) { }
}

export class GetPostCommentsError implements Action {
    readonly type = GET_POST_COMMENTS_ERROR;
    constructor(public payload: any) { }
}

export class ClosePostComments implements Action {
    readonly type = CLOSE_POST_COMMENTS;
    constructor(public payload: number) { }
}

export type PostsActions = GetUsersPostsSuccess | GetUsersPostsError | ShowAllPost |
    GetPostComments | GetPostCommentsSuccess | GetPostCommentsError | ClosePostComments | SetSelectedUser;
