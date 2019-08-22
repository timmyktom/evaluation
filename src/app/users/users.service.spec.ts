import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { UsersService } from './users.service';
import * as mockUserData from '../../tests-utils/mock-users';

const sampleUserResponse  = mockUserData.mockUsers;

class MockHttpClient {
  get(url: string) {
      if (url === 'https://jsonplaceholder.typicode.com/users') {
          const response = [...sampleUserResponse ];
          return of(response);
      }
      return of(false);
  }
}

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          providers: [
              UsersService,
              {provide: HttpClient, useClass: MockHttpClient }
          ]
      }).compileComponents();
      service = TestBed.get(UsersService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
      it('get all Users', (done) => {
          const observable = service.getUsers();
          observable.subscribe((result) => {
              expect(result).toEqual(sampleUserResponse);
              done();
          });
      });
  });
});
