import { WalletAction, WalletActionTypes } from './wallet.actions';

export const WALLET_FEATURE_KEY = 'wallet';

/**
 * Interface for the 'Wallet' data used in
 *  - WalletState, and
 *  - walletReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Wallet {
  objectId: string;
  balance: number;
  currency?: string;
}
export interface Transactions {}

export interface WalletState {
  wallet: Wallet; // Wallet; analogous to a sql normalized table
  loaded: boolean; // has the Wallet been loaded
  error?: any; // last none error (if any)
}

export interface WalletPartialState {
  readonly [WALLET_FEATURE_KEY]: WalletState;
}

export const initialWallet: Wallet = {
  objectId: '',
  balance: 0,
  currency: 'Naira'
};

export const initialWalletState: WalletState = {
  wallet: initialWallet,
  loaded: false
};

export function walletReducer(
  state: WalletState = initialWalletState,
  action: WalletAction
): WalletState {
  switch (action.type) {
    case WalletActionTypes.WalletLoaded: {
      state = {
        ...state,
        wallet: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
