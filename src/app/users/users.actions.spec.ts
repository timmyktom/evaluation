import * as userActions from './users.actions';
import * as mockUserData from '../../tests-utils/mock-users';

describe('GetUsers', () => {
    it('should create an action', () => {
        const action = new userActions.GetUsers();
        expect(action.type).toEqual(userActions.GET_USERS);
    });
});

describe('GetUsersSuccess', () => {
    it('should create an action', () => {
        const action = new userActions.GetUsersSuccess(mockUserData.mockUsers);
        expect(action.type).toEqual(userActions.GET_USERS_SUCCESS);
        expect(action.payload).toEqual(mockUserData.mockUsers);
    });
});

describe('GetUsersError', () => {
    it('should create an action', () => {
        const error = new Error();
        const action = new userActions.GetUsersError(error);
        expect(action.type).toEqual(userActions.GET_USERS_ERROR);
        expect(action.payload).toEqual(error);
    });
});

describe('GetUserDetails', () => {
    it('should create an action', () => {
        const id = mockUserData.mockUsers[0].id;
        const action = new userActions.SetSelectedUser(id);
        expect(action.type).toEqual(userActions.SET_SELECTED_USER);
        expect(action.payload).toEqual(id);
    });
});
