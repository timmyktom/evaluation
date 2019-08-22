import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsersService } from './users.service';
import * as actions from './users.actions';

@Injectable()
export class UserEffects {
    getUsersEffects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.GET_USERS),
            switchMap(() => {
                return this.userService.getUsers()
                .pipe(
                    map(userList => {
                        return new actions.GetUsersSuccess(userList);
                    }),
                    catchError((error) => {
                        return of(new actions.GetUsersError(error));
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UsersService
    ) { }
}
