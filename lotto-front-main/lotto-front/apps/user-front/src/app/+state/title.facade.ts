import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { TitlePartialState } from './title.reducer';
import { titleQuery } from './title.selectors';
import { LoadTitle } from './title.actions';

@Injectable()
export class TitleFacade {
  loaded$ = this.store.pipe(select(titleQuery.getLoaded));
  allTitle$ = this.store.pipe(select(titleQuery.getAllTitle));
  selectedTitle$ = this.store.pipe(select(titleQuery.getSelectedTitle));

  constructor(private store: Store<TitlePartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadTitle());
  }
}
