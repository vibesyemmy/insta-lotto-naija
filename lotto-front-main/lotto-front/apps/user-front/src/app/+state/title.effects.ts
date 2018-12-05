import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { TitlePartialState } from './title.reducer';
import {
  LoadTitle,
  TitleLoaded,
  TitleLoadError,
  TitleActionTypes
} from './title.actions';

@Injectable()
export class TitleEffects {
  @Effect() loadTitle$ = this.dataPersistence.fetch(
    TitleActionTypes.LoadTitle,
    {
      run: (action: LoadTitle, state: TitlePartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new TitleLoaded("");
      },

      onError: (action: LoadTitle, error) => {
        console.error('Error', error);
        return new TitleLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TitlePartialState>
  ) {}
}
