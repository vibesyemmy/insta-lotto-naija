import { Entity, TransactionState } from './transaction.reducer';
import { transactionQuery } from './transaction.selectors';

describe('Transaction Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTransactionId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createTransaction = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      transaction: {
        list: [
          createTransaction('PRODUCT-AAA'),
          createTransaction('PRODUCT-BBB'),
          createTransaction('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Transaction Selectors', () => {
    it('getAllTransaction() should return the list of Transaction', () => {
      const results = transactionQuery.getAllTransaction(storeState);
      const selId = getTransactionId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedTransaction() should return the selected Entity', () => {
      const result = transactionQuery.getSelectedTransaction(storeState);
      const selId = getTransactionId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = transactionQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = transactionQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
