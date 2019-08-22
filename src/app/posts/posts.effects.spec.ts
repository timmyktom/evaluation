import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Subject, of, ReplaySubject, throwError } from 'rxjs';
import { PostsEffects } from './posts.effects';
import { PostsService } from './posts.service';
import { AppState } from '../shared/reducers';
import * as usersActions from '../users/users.actions';
import * as postsActions from './posts.actions';
import * as mockPostData from '../../tests-utils/mock-posts';

describe('PostsEffects', () => {
    let effects: PostsEffects;
    let service: Partial<PostsService>;
    let actions$: ReplaySubject<Action>;
    let appState: Subject<AppState>;

    beforeEach(() => {
        appState = new Subject<AppState>();
        service = { getUserPosts(): any {}} as Partial<PostsService>;
        actions$ = new ReplaySubject(1);
        TestBed.configureTestingModule({
            providers: [
                PostsEffects,
                provideMockActions(() => actions$),
                { provide: PostsService, useFactory: () => service }
            ],
        });
        effects = TestBed.get<PostsEffects>(PostsEffects);
    });

    it('should create', () => {
        expect(effects).toBeTruthy();
    });

    describe('SetSelectedUser action', () => {
        let getPostsServiceCall;
        beforeEach(() => {
            getPostsServiceCall = spyOn(service, 'getUserPosts');
        });

        describe('When SetSelectedUser action is dispatched', () => {
            beforeEach(() => {
                getPostsServiceCall.and.returnValue(of([]));
                effects.getUsersPostsEffects$.subscribe();
                actions$.next(new usersActions.SetSelectedUser(1));
            });
            it('Check service is getting called', () => {
                expect(getPostsServiceCall).toHaveBeenCalledTimes(1);
            });
        });

        describe('When GetUsersPostsSuccess action is dispatched with success response', () => {
            const expectedPayload = mockPostData.mockPosts;
            beforeEach(() => {
                getPostsServiceCall.and.returnValue(of(mockPostData.mockPosts));
                actions$.next(new usersActions.SetSelectedUser(1));
            });
            it('dispatch GetUsersPostsSuccess action on success', (done) => {
                effects.getUsersPostsEffects$.subscribe((resultAction) => {
                    const expectedAction = new postsActions.GetUsersPostsSuccess(expectedPayload);
                    expect(resultAction).toEqual(expectedAction);
                    done();
                });
            });
        });

        describe('When GetUsersPostsError action is dispatched with failed response', () => {
            const mockError = { message: 'Error'};
            beforeEach(() => {
                getPostsServiceCall.and.returnValue(throwError(mockError));
                actions$.next(new usersActions.SetSelectedUser(1));
            });
            it('dispatch GetPostsError action on fail', (done) => {
                effects.getUsersPostsEffects$.subscribe((resultAction) => {
                    const expectedAction = new postsActions.GetUsersPostsError(mockError);
                    expect(resultAction).toEqual(expectedAction);
                    done();
                });
            });
        });
    });
});
