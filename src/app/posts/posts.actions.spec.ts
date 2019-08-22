import * as postActions from './posts.actions';
import * as mockPostData from '../../tests-utils/mock-posts';
import * as mockCommentData from '../../tests-utils/mock-comments';

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

describe('GetPostComments', () => {
    it('should create an action', () => {
        const action = new postActions.GetPostComments(1);
        expect(action.type).toEqual(postActions.GET_POST_COMMENTS);
        expect(action.payload).toEqual(1);
    });
});

describe('GetPostCommentsSuccess', () => {
    it('should create an action', () => {
        const action = new postActions.GetPostCommentsSuccess(mockCommentData.mockComments);
        expect(action.type).toEqual(postActions.GET_POST_COMMENTS_SUCCESS);
        expect(action.payload).toEqual(mockCommentData.mockComments);
    });
});

describe('GetPostCommentsError', () => {
    it('should create an action', () => {
        const error = new Error();
        const action = new postActions.GetPostCommentsError(error);
        expect(action.type).toEqual(postActions.GET_POST_COMMENTS_ERROR);
        expect(action.payload).toEqual(error);
    });
});

describe('ClosePostComments', () => {
    it('should create an action', () => {
        const action = new postActions.ClosePostComments(1);
        expect(action.type).toEqual(postActions.CLOSE_POST_COMMENTS);
        expect(action.payload).toEqual(1);
    });
});
