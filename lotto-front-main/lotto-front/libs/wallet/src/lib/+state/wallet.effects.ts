import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import * as Parse from 'parse';

import { WalletPartialState, Wallet, initialWallet } from './wallet.reducer';
import {
  LoadWallet,
  WalletLoaded,
  WalletLoadError,
  WalletActionTypes
} from './wallet.actions';
import { WalletService } from '../wallet.service';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class WalletEffects {
  @Effect() loadWallet$ = this.dataPersistence.fetch(
    WalletActionTypes.LoadWallet,
    {
      run: (action: LoadWallet, state: WalletPartialState) => {
        return this.walletService.getWallet().pipe(
          startWith(initialWallet),
          map(
            (wallet: Wallet) =>
              new WalletLoaded({
                objectId: wallet.objectId,
                balance: wallet.balance
              })
          )
        );
      },

      onError: (action: LoadWallet, error) => {
        console.error('Error', error);
        return new WalletLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<WalletPartialState>,
    private walletService: WalletService
  ) {}
}
