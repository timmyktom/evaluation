import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Subject, of, ReplaySubject, throwError } from 'rxjs';
import { UserEffects } from './users.effects';
import { UsersService } from './users.service';
import { AppState } from '../shared/reducers';
import * as usersActions from './users.actions';
import * as mockUserData from '../../tests-utils/mock-users';

describe('UserEffects', () => {
    let effects: UserEffects;
    let service: Partial<UsersService>;
    let actions$: ReplaySubject<Action>;
    let appState: Subject<AppState>;

    beforeEach(() => {
        appState = new Subject<AppState>();
        service = { getUsers(): any {}} as Partial<UsersService>;
        actions$ = new ReplaySubject(1);
        TestBed.configureTestingModule({
            providers: [
                UserEffects,
                provideMockActions(() => actions$),
                { provide: UsersService, useFactory: () => service }
            ],
        });
        effects = TestBed.get<UserEffects>(UserEffects);
    });

    it('should create', () => {
        expect(effects).toBeTruthy();
    });

    describe('GET_BOOKS action', () => {
        let getUsersServiceCall;
        beforeEach(() => {
            getUsersServiceCall = spyOn(service, 'getUsers');
        });

        describe('When GetUsers action is dispatched', () => {
            beforeEach(() => {
                getUsersServiceCall.and.returnValue(of([]));
                effects.getUsersEffects$.subscribe();
                actions$.next(new usersActions.GetUsers());
            });
            it('Check service is getting called', () => {
                expect(getUsersServiceCall).toHaveBeenCalledTimes(1);
            });
        });

        describe('When GetUsers action is dispatched with success response', () => {
            const expectedPayload = mockUserData.mockUsers;
            beforeEach(() => {
                getUsersServiceCall.and.returnValue(of(mockUserData.mockUsers));
                actions$.next(new usersActions.GetUsers());
            });
            it('dispatch GetUsersSuccess action on success', (done) => {
                effects.getUsersEffects$.subscribe((resultAction) => {
                    const expectedAction = new usersActions.GetUsersSuccess(expectedPayload);
                    expect(resultAction).toEqual(expectedAction);
                    done();
                });
            });
        });

        describe('When GetUsers action is dispatched with failed response', () => {
            const mockError = { message: 'Error'};
            beforeEach(() => {
                getUsersServiceCall.and.returnValue(throwError(mockError));
                actions$.next(new usersActions.GetUsers());
            });
            it('dispatch GetUsersError action on fail', (done) => {
                effects.getUsersEffects$.subscribe((resultAction) => {
                    const expectedAction = new usersActions.GetUsersError(mockError);
                    expect(resultAction).toEqual(expectedAction);
                    done();
                });
            });
        });
    });
});
