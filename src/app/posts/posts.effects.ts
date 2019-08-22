import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { PostsService } from './posts.service';
import * as actions from '../shared/actions';


@Injectable()
export class PostsEffects {
    getUsersPostsEffects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.SET_SELECTED_USER),
            switchMap(({ payload }) => {
                return this.postsService.getUserPosts(payload)
                .pipe(
                    map(postsList => {
                        return new actions.GetUsersPostsSuccess(postsList);
                    }),
                    catchError((error) => {
                        return of(new actions.GetUsersPostsError(error));
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private postsService: PostsService
    ) { }
}
