import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TRANSACTION_FEATURE_KEY,
  TransactionState
} from './transaction.reducer';

// Lookup the 'Transaction' feature state managed by NgRx
const getTransactionState = createFeatureSelector<TransactionState>(
  TRANSACTION_FEATURE_KEY
);

const getLoaded = createSelector(
  getTransactionState,
  (state: TransactionState) => state.loaded
);
const getError = createSelector(
  getTransactionState,
  (state: TransactionState) => state.error
);

const getAllTransaction = createSelector(
  getTransactionState,
  getLoaded,
  (state: TransactionState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getTransactionState,
  (state: TransactionState) => state.selectedId
);
const getSelectedTransaction = createSelector(
  getAllTransaction,
  getSelectedId,
  (transaction, id) => {
    const result = transaction.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const transactionQuery = {
  getLoaded,
  getError,
  getAllTransaction,
  getSelectedTransaction
};
