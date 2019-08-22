import * as fromUsers from '../users/users.reducers';

export interface AppState {
    userState: fromUsers.UserState;
}

export const reducers = {
    userState: fromUsers.UsersReducer
};
