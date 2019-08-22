import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { StoreModule, Store, Action } from '@ngrx/store';
import { AppState } from '../shared/reducers';
import { PostsComponent } from './posts.component';
import { UserState, initialUserState} from '../users/users.reducers';
import { PostState, initialPostState } from '../posts/posts.reducers';
import { ShowAllPost, GetPostComments, ClosePostComments } from './posts.actions';
import { Comment } from './posts.model';
import { MockReducer } from '../../tests-utils/';
import * as mockUserData from '../../tests-utils/mock-users';
import * as mockPostData from '../../tests-utils/mock-posts';

@Component({
  selector: 'app-comments',
  template: '',
})
class MockCommentsComponent {
  @Input() commentsList: Comment[];
}

@Component({
  selector: 'app-loader',
  template: '',
})
class MockLoaderComponent {}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store: Store<{}>;
  let userState: UserState;
  let postState: PostState;

  beforeEach(async(() => {
    userState = {...initialUserState,
      userList: mockUserData.mockUsers,
      selectedUser: mockUserData.mockUsers[0]
    };
    postState = {...initialPostState,
      filteredPostList: mockPostData.mockPosts
    };
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: {
          userState: {...userState},
          postState: {...postState}}})
      ],
      declarations: [ PostsComponent, MockCommentsComponent, MockLoaderComponent ],
      imports: [StoreModule.forRoot({
        userState: (state, action) => userState
      } as MockReducer<AppState>)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    store = fixture.componentRef.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When ngOnDestroy is called ', () => {
    it('should unsubscribe', () => {
        spyOn(component.userStoreSubscription, 'unsubscribe');
        spyOn(component.postStoreSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.userStoreSubscription.unsubscribe).toHaveBeenCalledTimes(1);
        expect(component.postStoreSubscription.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('When onShowAllPosts is called ', () => {
    it('should dispatch action ShowAllPost', (done) => {
        const expectedAction = new ShowAllPost();
        spyOn(store, 'dispatch').and.callFake((actualAction: Action) => {
            expect(actualAction).toEqual(expectedAction);
            done();
        });
        component.onShowAllPosts();
    });
  });

  describe('When onGetCommentsForPost is called ', () => {
    it('should dispatch action GetPostComments', (done) => {
      const expectedAction = new GetPostComments(mockPostData.mockPosts[0].id);
      spyOn(store, 'dispatch').and.callFake((actualAction: Action) => {
          expect(actualAction).toEqual(expectedAction);
          done();
      });
      component.onGetCommentsForPost({...mockPostData.mockPosts[0], isExpanded: false});
    });
    it('should dispatch action ClosePostComments if already expanded', (done) => {
      const expectedAction = new ClosePostComments(mockPostData.mockPosts[0].id);
      spyOn(store, 'dispatch').and.callFake((actualAction: Action) => {
          expect(actualAction).toEqual(expectedAction);
          done();
      });
      component.onGetCommentsForPost({...mockPostData.mockPosts[0], isExpanded: true});
    });
  });
});
