import * as fromPostsReducers from './posts.reducers';
import * as fromUsersActions from '../users/users.actions';
import * as fromPostsActions from './posts.actions';
import * as mockPostData from '../../tests-utils/mock-posts';

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
        const action = new fromPostsActions.GetUsersPostsSuccess(mockPostData.mockPosts);
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

});
