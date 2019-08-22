import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getUserPosts(userId) {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }
}
