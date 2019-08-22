import * as fromUsers from '../users/users.reducers';
import * as fromPosts from '../posts/posts.reducers';

export interface AppState {
    userState: fromUsers.UserState;
    postState: fromPosts.PostState;
}

export const reducers = {
    userState: fromUsers.UsersReducer,
    postState: fromPosts.PostsReducer
};
