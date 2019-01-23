import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { TransactionPartialState } from './transaction.reducer';
import {
  LoadTransaction,
  TransactionLoaded,
  TransactionLoadError,
  TransactionActionTypes
} from './transaction.actions';

@Injectable()
export class TransactionEffects {
  @Effect() loadTransaction$ = this.dataPersistence.fetch(
    TransactionActionTypes.LoadTransaction,
    {
      run: (action: LoadTransaction, state: TransactionPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new TransactionLoaded([]);
      },

      onError: (action: LoadTransaction, error) => {
        console.error('Error', error);
        return new TransactionLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TransactionPartialState>
  ) {}
}
