import { ActionReducer, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { User, defaultUser } from './users.model';

export interface UserState {
    userList: User[];
    isUserListLoading: boolean;
    isError: boolean;
    selectedUser: User;
}

export const initialUserState: UserState = {
    userList: [],
    isUserListLoading: false,
    isError: false,
    selectedUser: defaultUser
};

export function UsersReducer(state = initialUserState, action: UsersActions.UsersActions): UserState {
    let newState: UserState;
    switch (action.type) {
        case UsersActions.GET_USERS:
            newState = {...state,
                userList: [],
                isUserListLoading: true,
                isError: false
            };
            return newState;
        case UsersActions.GET_USERS_SUCCESS:
            newState = {...state,
                userList: action.payload,
                isUserListLoading: false,
                isError: false
            };
            return newState;
        case UsersActions.GET_USERS_ERROR:
            newState = {...state,
                isUserListLoading: false,
                isError: true
            };
            return newState;
        case UsersActions.SET_SELECTED_USER:
            newState = {...state,
                selectedUser:  getUserDetails(state.userList, action.payload)
            };
            return newState;
        default:
            return state;
    }
}

function getUserDetails(userList: User[], userId: number) {
    return userList.find(user =>
        user.id === userId);
}
