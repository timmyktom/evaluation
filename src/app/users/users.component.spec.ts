import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, Action } from '@ngrx/store';
import { AppState } from '../shared/reducers';
import { UsersComponent } from './users.component';
import { UserState, initialUserState} from './users.reducers';
import { SetSelectedUser } from './users.actions';
import { MockReducer } from '../../tests-utils/';
import * as mockUserData from '../../tests-utils/mock-users';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: Store<{}>;
  let userState: UserState;

  beforeEach(async(() => {
    userState = {...initialUserState, userList: mockUserData.mockUsers };
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: { userState: {...userState}}})
      ],
      declarations: [ UsersComponent ],
      imports: [StoreModule.forRoot({
        userState: (state, action) => userState
      } as MockReducer<AppState>)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    store = fixture.componentRef.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI elements ', () => {
    it('should show users-list when users not available', () => {
        const userListElement = fixture.debugElement.nativeElement.querySelector('.users-list');
        const usersElements = fixture.debugElement.queryAll(By.css('.users-list .user-name'));
        expect(userListElement).toBeDefined();
        expect(usersElements.length).toEqual(mockUserData.mockUsers.length);
    });
    it('should show only first name', () => {
      const usersNameElements = fixture.debugElement.nativeElement.querySelector('.users-list .user-name button');
      expect(usersNameElements.innerText).toEqual(mockUserData.mockUsers[0].name.split(' ')[0]);
    });
    it('should not show users-list when users not available', () => {
      component.userState.userList = [];
      fixture.detectChanges();
      const userListElement = fixture.debugElement.nativeElement.querySelector('.users-list');
      expect(userListElement).toBe(null);
    });
  });

  describe('When ngOnDestroy is called ', () => {
    it('should unsubscribe', () => {
        spyOn(component.userStoreSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.userStoreSubscription.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('When onUserSelect is called ', () => {
    it('should dispatch action SetSelectedUser', (done) => {
        const expectedAction = new SetSelectedUser(1);
        spyOn(store, 'dispatch').and.callFake((actualAction: Action) => {
            expect(actualAction).toEqual(expectedAction);
            done();
        });
        component.onUserSelect(1);
    });
  });
});
