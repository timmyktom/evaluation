import * as fromUsersReducers from './users.reducers';
import * as fromUsersActions from './users.actions';
import * as mockUserData from '../../tests-utils/mock-users';

describe('UsersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialUserState } = fromUsersReducers;
      const state = fromUsersReducers.UsersReducer(undefined, {} as any);
      expect(state).toBe(initialUserState);
    });
  });

  describe('GET_BOOKS action', () => {
    it('should set isUserListLoading to true and userList to empty', () => {
        const { initialUserState } = fromUsersReducers;
        const action = new fromUsersActions.GetUsers();
        const state = fromUsersReducers.UsersReducer(initialUserState, action);

        expect(state.isUserListLoading).toEqual(true);
        expect(state.isError).toEqual(false);
        expect(state.userList).toEqual([]);
    });
  });

  describe('GET_BOOKS_SUCCESS action', () => {
    it('should set isUserListLoading to false, error to false and userList', () => {
        const { initialUserState } = fromUsersReducers;
        const action = new fromUsersActions.GetUsersSuccess(mockUserData.mockUsers);
        const state = fromUsersReducers.UsersReducer(initialUserState, action);

        expect(state.isUserListLoading).toEqual(false);
        expect(state.isError).toEqual(false);
        expect(state.userList).toEqual(mockUserData.mockUsers);
    });
  });

  describe('GET_BOOKS_ERROR action', () => {
    it('should set isUserListLoading to false and Error to true', () => {
        const { initialUserState } = fromUsersReducers;
        const action = new fromUsersActions.GetUsersError(new Error());
        const state = fromUsersReducers.UsersReducer(initialUserState, action);

        expect(state.isUserListLoading).toEqual(false);
        expect(state.isError).toEqual(true);
    });
  });

  describe('SET_SELECTED_USER action', () => {
    it('should set selected user', () => {
        const { initialUserState } = fromUsersReducers;
        const previousState = { ...initialUserState, userList: mockUserData.mockUsers};
        const action = new fromUsersActions.SetSelectedUser(mockUserData.mockUsers[0].id);
        const state = fromUsersReducers.UsersReducer(previousState, action);

        expect(state.isError).toEqual(false);
        expect(state.userList).toEqual(mockUserData.mockUsers);
        expect(state.selectedUser).toEqual(mockUserData.mockUsers[0]);
    });
  });
});
