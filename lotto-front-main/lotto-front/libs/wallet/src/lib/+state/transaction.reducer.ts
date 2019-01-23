import {
  TransactionAction,
  TransactionActionTypes
} from './transaction.actions';

export const TRANSACTION_FEATURE_KEY = 'transaction';

/**
 * Interface for the 'Transaction' data used in
 *  - TransactionState, and
 *  - transactionReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface TransactionState {
  list: Entity[]; // list of Transaction; analogous to a sql normalized table
  selectedId?: string | number; // which Transaction record has been selected
  loaded: boolean; // has the Transaction list been loaded
  error?: any; // last none error (if any)
}

export interface TransactionPartialState {
  readonly [TRANSACTION_FEATURE_KEY]: TransactionState;
}

export const initialTranxState: TransactionState = {
  list: [],
  loaded: false
};

export function transactionReducer(
  state: TransactionState = initialTranxState,
  action: TransactionAction
): TransactionState {
  switch (action.type) {
    case TransactionActionTypes.TransactionLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
