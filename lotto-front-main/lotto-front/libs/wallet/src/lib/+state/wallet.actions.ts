import { Action } from '@ngrx/store';
import { Wallet } from './wallet.reducer';

export enum WalletActionTypes {
  LoadWallet = '[Wallet] Load Wallet',
  WalletLoaded = '[Wallet] Wallet Loaded',
  WalletLoadError = '[Wallet] Wallet Load Error'
}

export class LoadWallet implements Action {
  readonly type = WalletActionTypes.LoadWallet;
}

export class WalletLoadError implements Action {
  readonly type = WalletActionTypes.WalletLoadError;
  constructor(public payload: any) {}
}

export class WalletLoaded implements Action {
  readonly type = WalletActionTypes.WalletLoaded;
  constructor(public payload: Wallet) {}
}

export type WalletAction = LoadWallet | WalletLoaded | WalletLoadError;

export const fromWalletActions = {
  LoadWallet,
  WalletLoaded,
  WalletLoadError
};
