import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WALLET_FEATURE_KEY,
  WalletState,
  initialWallet
} from './wallet.reducer';

// Lookup the 'Wallet' feature state managed by NgRx
const getWalletState = createFeatureSelector<WalletState>(WALLET_FEATURE_KEY);

const getLoaded = createSelector(
  getWalletState,
  (state: WalletState) => state.loaded
);
const getError = createSelector(
  getWalletState,
  (state: WalletState) => state.error
);

const getWallet = createSelector(
  getWalletState,
  getLoaded,
  (state: WalletState, isLoaded) => {
    return isLoaded ? state.wallet : initialWallet;
  }
);

export const walletQuery = {
  getLoaded,
  getError,
  getWallet
};
