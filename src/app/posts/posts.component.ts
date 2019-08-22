import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../shared/reducers';
import { UserState } from '../users/users.reducers';
import { PostState } from './posts.reducers';
import { ShowAllPost } from './posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  userStoreSubscription: Subscription;
  postStoreSubscription: Subscription;
  userState: UserState;
  postState: PostState;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userStoreSubscription =
      this.store.select(state => state.userState).subscribe((uState) => {
        this.userState = uState;
      });

    this.postStoreSubscription =
      this.store.select(state => state.postState).subscribe((pState) => {
        this.postState = pState;
      });
  }

  ngOnDestroy() {
    if (this.userStoreSubscription) {
      this.userStoreSubscription.unsubscribe();
    }
    if (this.postStoreSubscription) {
      this.postStoreSubscription.unsubscribe();
    }
  }

  onShowAllPosts() {
    this.store.dispatch(new ShowAllPost());
  }
}
