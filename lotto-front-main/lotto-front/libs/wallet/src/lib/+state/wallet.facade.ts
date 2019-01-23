import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletState } from './wallet.reducer';
import { LoadWallet } from './wallet.actions';
import { walletQuery } from './wallet.selectors';

@Injectable()
export class WalletFacade {
  wallet$ = this.store.select(walletQuery.getWallet);
  constructor(private store: Store<WalletState>) {}

  loadWallet() {
    this.store.dispatch(new LoadWallet());
  }
}
