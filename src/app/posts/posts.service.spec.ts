import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { PostsService } from './posts.service';
import * as mockPostData from '../../tests-utils/mock-posts';

const sampleUserPostResponse  = mockPostData.mockPosts;

class MockHttpClient {
  get(url: string) {
      if (url === 'https://jsonplaceholder.typicode.com/posts?userId=1') {
          const response = [...sampleUserPostResponse ];
          return of(response);
      }
      return of(false);
  }
}

describe('PostsService', () => {
  let service: PostsService;
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          providers: [
            PostsService,
              {provide: HttpClient, useClass: MockHttpClient }
          ]
      }).compileComponents();
      service = TestBed.get(PostsService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserPosts', () => {
    it('get all UserPosts', (done) => {
        const observable = service.getUserPosts(1);
        observable.subscribe((result) => {
            expect(result).toEqual(sampleUserPostResponse);
            done();
        });
    });
  });
});
