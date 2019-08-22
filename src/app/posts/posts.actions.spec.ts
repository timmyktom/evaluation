import * as postActions from './posts.actions';
import * as mockPostData from '../../tests-utils/mock-posts';

describe('GetUsersPostsSuccess', () => {
    it('should create an action', () => {
        const action = new postActions.GetUsersPostsSuccess(mockPostData.mockPosts);
        expect(action.type).toEqual(postActions.GET_USERS_POSTS_SUCCESS);
        expect(action.payload).toEqual(mockPostData.mockPosts);
    });
});

describe('GetUsersPostsError', () => {
    it('should create an action', () => {
        const error = new Error();
        const action = new postActions.GetUsersPostsError(error);
        expect(action.type).toEqual(postActions.GET_USERS_POSTS_ERROR);
        expect(action.payload).toEqual(error);
    });
});

describe('ShowAllPost', () => {
    it('should create an action', () => {
        const action = new postActions.ShowAllPost();
        expect(action.type).toEqual(postActions.SHOW_ALL_POST);
    });
});
