import * as fromPostsReducers from './posts.reducers';
import * as fromUsersActions from '../users/users.actions';
import * as fromPostsActions from './posts.actions';
import * as mockPostData from '../../tests-utils/mock-posts';
import * as mockCommentData from '../../tests-utils/mock-comments';

describe('PostsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialPostState } = fromPostsReducers;
      const state = fromPostsReducers.PostsReducer(undefined, {} as any);
      expect(state).toBe(initialPostState);
    });
  });

  describe('SET_SELECTED_USER action', () => {
    it('should set isPostListLoading to true and postList to empty', () => {
        const { initialPostState } = fromPostsReducers;
        const action = new fromUsersActions.SetSelectedUser(1);
        const state = fromPostsReducers.PostsReducer(initialPostState, action);

        expect(state.isPostListLoading).toEqual(true);
        expect(state.isError).toEqual(false);
        expect(state.postList).toEqual([]);
    });
  });

  describe('GET_USERS_POSTS_SUCCESS action', () => {
    it('should set isPostListLoading to false, error to false and postList', () => {
        const { initialPostState } = fromPostsReducers;
        const action = new fromPostsActions.GetUsersPostsSuccess([...mockPostData.mockPosts]);
        const state = fromPostsReducers.PostsReducer(initialPostState, action);

        expect(state.isPostListLoading).toEqual(false);
        expect(state.isError).toEqual(false);
        expect(state.postList).toEqual(mockPostData.mockPosts);
    });
  });

  describe('GET_USERS_POSTS_ERROR action', () => {
    it('should set isPostListLoading to false and Error to true', () => {
        const { initialPostState } = fromPostsReducers;
        const action = new fromPostsActions.GetUsersPostsError(new Error());
        const state = fromPostsReducers.PostsReducer(initialPostState, action);

        expect(state.isPostListLoading).toEqual(false);
        expect(state.isError).toEqual(true);
    });
  });

  describe('SHOW_ALL_POST action', () => {
    it('should set filteredPostList with postList', () => {
        const { initialPostState } = fromPostsReducers;
        const prevState = {...initialPostState,
          filteredPostList: [{...mockPostData.mockPosts[0]}],
          postList: [...mockPostData.mockPosts],
          showAll: false
        };
        const action = new fromPostsActions.ShowAllPost();
        const state = fromPostsReducers.PostsReducer(prevState, action);

        expect(state.filteredPostList.length).toEqual(state.postList.length);
        expect(state.showAll).toEqual(true);
    });
  });
  describe('GET_POST_COMMENTS action', () => {
    it('should set isExpanded to true for the post item', () => {
        const { initialPostState } = fromPostsReducers;
        const prevState = {...initialPostState,
          postList: [...mockPostData.mockPosts],
        };
        const action = new fromPostsActions.GetPostComments(mockPostData.mockPosts[0].id);
        const state = fromPostsReducers.PostsReducer(prevState, action);

        expect(state.postList[0].isExpanded).toEqual(true);
        expect(state.postList[0].isCommentsLoading).toEqual(true);
    });
  });
  describe('GET_POST_COMMENTS_SUCCESS action', () => {
    it('should set comments for the post item', () => {
        const { initialPostState } = fromPostsReducers;
        const prevState = {...initialPostState,
          postList: [...mockPostData.mockPosts],
        };
        const action = new fromPostsActions.GetPostCommentsSuccess(mockCommentData.mockComments);
        const state = fromPostsReducers.PostsReducer(prevState, action);
        expect(state.filteredPostList[0].comments.length).toEqual(mockCommentData.mockComments.length);
        expect(state.filteredPostList[0].isCommentsLoading).toEqual(false);
    });
  });
  describe('GET_POST_COMMENTS_ERROR action', () => {
    it('should set Error to true', () => {
        const { initialPostState } = fromPostsReducers;
        const action = new fromPostsActions.GetPostCommentsError(new Error());
        const state = fromPostsReducers.PostsReducer(initialPostState, action);

        expect(state.isError).toEqual(true);
    });
  });
  describe('CLOSE_POST_COMMENTS action', () => {
    it('should set isExpanded to false for the post item', () => {
        const { initialPostState } = fromPostsReducers;
        const prevState = {...initialPostState,
          postList: [...mockPostData.mockPosts],
        };
        const action = new fromPostsActions.ClosePostComments(mockPostData.mockPosts[0].id);
        const state = fromPostsReducers.PostsReducer(prevState, action);

        expect(state.postList[0].isExpanded).toEqual(false);
    });
  });
});
