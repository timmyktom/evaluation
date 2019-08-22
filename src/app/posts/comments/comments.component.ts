import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../posts.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() commentsList: Comment[];
  constructor() { }

  ngOnInit() {
  }

}
