import { Action } from '@ngrx/store';
import { Entity } from './transaction.reducer';

export enum TransactionActionTypes {
  LoadTransaction = '[Transaction] Load Transaction',
  TransactionLoaded = '[Transaction] Transaction Loaded',
  TransactionLoadError = '[Transaction] Transaction Load Error'
}

export class LoadTransaction implements Action {
  readonly type = TransactionActionTypes.LoadTransaction;
}

export class TransactionLoadError implements Action {
  readonly type = TransactionActionTypes.TransactionLoadError;
  constructor(public payload: any) {}
}

export class TransactionLoaded implements Action {
  readonly type = TransactionActionTypes.TransactionLoaded;
  constructor(public payload: Entity[]) {}
}

export type TransactionAction =
  | LoadTransaction
  | TransactionLoaded
  | TransactionLoadError;

export const fromTransactionActions = {
  LoadTransaction,
  TransactionLoaded,
  TransactionLoadError
};
