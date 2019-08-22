import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { AppComponent } from './app.component';
import { GetUsers } from './shared/actions';

@Component({
  selector: 'app-users',
  template: '',
})
class MockUsersComponent {}

@Component({
  selector: 'app-posts',
  template: '',
})
class MockPostsComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<{}>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            userState: {}
          }
        })
      ],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, MockUsersComponent, MockPostsComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = fixture.componentRef.injector.get(Store);
    fixture.detectChanges();
});

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch GetUsers action ', () => {
      const actionUsers = new GetUsers();
      const spyActionUsers = spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(spyActionUsers).toHaveBeenCalledWith(actionUsers);
    });
  });
});
