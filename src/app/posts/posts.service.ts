import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post, Comment } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getUserPosts(userId) {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }

  getPostComments(postId) {
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  }
}
