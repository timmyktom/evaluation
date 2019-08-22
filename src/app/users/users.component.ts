import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../shared/reducers';
import { User } from './users.model';
import { UserState } from './users.reducers';
import { SetSelectedUser } from './users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  userStoreSubscription: Subscription;
  userState: UserState;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userStoreSubscription =
      this.store.select(state => state.userState).subscribe((uState) => {
        this.userState = uState;
      });
  }

  ngOnDestroy() {
    if (this.userStoreSubscription) {
      this.userStoreSubscription.unsubscribe();
    }
  }

  onUserSelect(userId) {
    this.store.dispatch(new SetSelectedUser(userId));
  }

}
