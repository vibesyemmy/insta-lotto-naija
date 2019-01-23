import { TransactionLoaded } from './transaction.actions';
import {
  TransactionState,
  Entity,
  initialTranxState,
  transactionReducer
} from './transaction.reducer';

describe('Transaction Reducer', () => {
  const getTransactionId = it => it['id'];
  let createTransaction;

  beforeEach(() => {
    createTransaction = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Transaction actions ', () => {
    it('should return set the list of known Transaction', () => {
      const transactions = [
        createTransaction('PRODUCT-AAA'),
        createTransaction('PRODUCT-zzz')
      ];
      const action = new TransactionLoaded(transactions);
      const result: TransactionState = transactionReducer(
        initialTranxState,
        action
      );
      const selId: string = getTransactionId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = transactionReducer(initialTranxState, action);

      expect(result).toBe(initialTranxState);
    });
  });
});
