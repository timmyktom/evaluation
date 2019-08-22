import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/reducers';
import { GetUsers } from './shared/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

    ngOnInit() {
      this.store.dispatch(new GetUsers());
    }
}
