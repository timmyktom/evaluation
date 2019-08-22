import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, Action } from '@ngrx/store';
import { AppState } from '../shared/reducers';
import { PostsComponent } from './posts.component';
import { UserState, initialUserState} from '../users/users.reducers';
import { PostState, initialPostState } from '../posts/posts.reducers';
import { ShowAllPost } from './posts.actions';
import { MockReducer } from '../../tests-utils/';
import * as mockUserData from '../../tests-utils/mock-users';
import * as mockPostData from '../../tests-utils/mock-posts';

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
      declarations: [ PostsComponent ],
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
});
